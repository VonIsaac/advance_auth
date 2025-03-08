const User = require('../models/User');
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
dotenv.config()
// for signup form


exports.signUp = (req, res) => {
    const {username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Find a user with the email
    User.findOne({ email })
        .then(user => {
            console.log(user);
            // Check if the user already exists
            if (user) {
                return res.status(401).json({ message: "User already exists" });
            }

            // Hash the password
            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {
            console.log(hashedPassword);
            // Create a new user with the email and hashed password
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role: "user"
            });

            return newUser.save(); // Save the user to the database
        })
        .then((result) => {
            console.log(`User created: ${result}`);
            res.status(201).json({ 
                result,
                message: "User registered successfully" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
};

// for log in form

exports.logIn = (req, res) => {
    console.log("Received login request:", req.body);
    const {email, password} = req.body
    
    User.findOne({email: email})
    .then(user => {
        console.log(user)
        console.log(`this is the ${user.role} role`)
        //check if the email credentials is wrong 
        if(!user){
            return  res.status(400).json({ 
                message: "Email Credential are wrong" ,
                users: user
            });
        }

        // use bycypt to campare the password enter by user and password in DB
        return bcrypt.compare(password, user.password)
        .then(doMatch => {
            console.log(doMatch)
            //check if credentials is valid
            if(!doMatch){
                return res.status(401).json({
                    message: "Invalid Credentials",
                    match: doMatch
                })
            }

            // create a JWT TOKEN
            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role // Add the user role to the token
                }, // Payload is the data you want to encode into the token. 
                process.env.JWT_SECRET, // secret key
                {expiresIn: "1h"} // token expire in 1hr
            )
             // Send token in HTTP-only cookie
             res.cookie("token", token, {
                httpOnly: true, // Prevents JavaScript access
                secure: false,
                sameSite: "Strict", // Prevents CSRF
                maxAge: 3600000 // 1 hour expiry
            });

            res.status(200).json({
                    message: "Login successful",
                    user: user,
                    token: token,
                    match: doMatch
                });
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Login Failed' });
    });
}

// handle to remove cookie 

exports.logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
    res.status(200).json({ message: 'Logged out successfully' });
}


// use crypto to create a 32 btyes token 
//const bytesTokens = crypto.randomBytes(6).toString("hex");

exports.postResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        console.log(user);

        // Check if the user email is not available in the database
        if (!user) {
            return res.status(400).json({ message: "User email not found" });
        }

        // Set the token
        const token = jwt.sign(
            { id: user.id}, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "1h", algorithm: "HS256" } // Token expires in 1 hour
        );

        // Store the token and expiration in the model
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

        // Save the user in the database
        const result = await user.save();

        console.log(result.resetToken);

        // Create a nodemailer transporter to send an email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `
            Hello ${result.username} Good Day, To proceed to the next page, you must 
            click this link to reset your password: http://localhost:3000/get-password/${result.resetToken}
            `,
        };

        // Send the email
        const emailResult = await transporter.sendMail(mailOptions);

        console.log(emailResult);

        if (!emailResult) {
            return res.status(501).json({ message: "Email error" });
        }

        res.json({ message: "Check your email for the reset link", token: result.resetToken });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: "Did not reset password" });
    }
};

exports.getNewPassword = async (req, res) => {
    const {token} = req.params
    console.log("Token received in request:", token);
   try{
        const user = await User.findOne({
            resetToken: token, // Get the token from the request body
            resetTokenExpiration: { $gt: Date.now() }
        })
        console.log(user)
        // check if the user is not available in the database
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        // stored the user id in the token because we need to use it to update the password
        res.json({
            message: "User found",
            token: token // send the token to the client
        })

   }catch(err){
    console.log("Error:", err);
    res.status(500).json({ message: "Did not reset password" });
   }

}


// handle to post new password 
exports.postNewPassword = async (req, res) => {
    const { password, token} = req.body;
    console.log("Received password reset request with token:", token);
    try {
        const user = await User.findOne({
            resetToken: token, // Get the token from the request body
            resetTokenExpiration: { $gt: Date.now() }, // Check if the token is still valid
        })

        console.log(user);
        
        // Check if the user is not available in the database
        if(!user){
           return  res.status(400).json({ message: "User not found" });
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(password, 12)

        // update the password and reset token
        user.password = hashedPassword
        user.resetToken = undefined
        user.resetTokenExpiration = undefined

        // save the user in the database
        await user.save();

        // send a response to the client
        res.status(200).json({
            message: "Password reset successful",
            user: user
        })

    }catch(err){
        console.log("Error:", err);
        res.status(500).json({ message: "Did not reset password" });
    }
}


exports.getProtectedData = async (req, res) => {
    const token = req.header("Authorization")?.split(' ')[1]; // Get the token from the header
    // If the token is not present, return an error
    if(!token){
        return res.status(401).json({message: "Access denied"}); 
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        console.log(decoded);
        const user = await User.findById(decoded.id).select("-password") // ensures the password is not included 
        console.log(user)
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user)
       // req.user = user; // Set the user to the decoded token
        
    }catch(err){ 
        // If the token is invalid, return an error
        console.log("JWT verification failed:", err.message);
        return res.status(401).json({message: "Access denied", token: token , error: err.message, });
    }
}