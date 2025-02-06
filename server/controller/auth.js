const User = require('../models/User');
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')


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

            res.json({ message: "Login successful" });
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    });
}