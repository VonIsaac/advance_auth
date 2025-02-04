const User = require('../models/User');
const bycrypt = require('bcryptjs');


exports.signUp = (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Check if password and confirm password are the same
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find a user with the email
    User.findOne({email: email })
        .then(user => {
            console.log(user);
            //check if the user exists in the database
            if (user) {
                return res.status(401).json({ message: "User already exists" });
            }

            // Hash the password
            return bycrypt.hash(password, 12);
        })
        .then(hashPassword => {
            console.log(hashPassword);
            // create a new user with the email and hashed password
            const createUser = new User({
                email,
                password: hashPassword
            });

            return createUser.save(); // Save the user to the database
        })
        .then((result) => {
            console.log(`User created: ${result}`);
            res.status(201).json({ message: "User registered successfully" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
};