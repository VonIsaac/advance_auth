const User = require('../models/User');
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.config()
// for signup form


exports.signUp = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
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
                email,
                password: hashedPassword
            });

            return newUser.save(); // Save the user to the database
        })
        .then((result) => {
            console.log(`User created: ${result}`);
            res.status(201).json({ 
                result: result,
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
                {id: user.id}, // Payload is the data you want to encode into the token. 
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

            res.json({
                    message: "Login successful",
                    token: token,
                    match: doMatch
                });
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    });
}

// handle to remove cookie 

exports.logout = (req, res) => {
    res.cookie('token', {
        httpOnly: true, 
        expires: new Date(0) // Set expiration date to the past

    });
    res.status(200).json({ message: 'Logged out successfully' });
}

exports.postResetPassword = (req, res) => {
    const {email} = req.body;

    User.findOne({email})
    .then(user => {
        console.log(user)
        //check if user email is did not available in database
        if(!user){
            return res.status(400).json({message: "User email not found"})
        }

        // set the token 
        const token = jwt.sign(
            {id: user.id}, // Payload is the data you want to encode into the token. 
            process.env.JWT_SECRET, // secret key
            {expiresIn: "1h"} // token expire in 1hr
        )

        // stored the token in model  and the tokenExpiration
        user.resetToken = token
        user.resetTokenExpiration  = Date.now() + 3600000; // 1 hour

        return user.save() // save in our db
    })
    .then(result => {
        
        console.log(result.resetToken)
         // create a nodemailer to send an email 
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
         });
        //Define Email Content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `
            Hello Gooday, To procced to the next page you must 
            click this link to reset your password: http://localhost:3000/reset-password/${result.resetToken}
            `,
        };

        return transporter.sendMail(mailOptions);
    })
    .then((token) => {
        console.log(token)
        if(!token){
            return res.status(501).json({ message: "Email error" });
        }
        res.json({ message: "Check your email for the reset link", token: token});
    })
    .catch(err => {
        console.log("Error:", err); // Log the actual error
        res.status(500).json({message: 'Did not reset password'})
    })
}
// handle to post new password 
exports.postNewPassword = (req, res) => {
// continue later...
}