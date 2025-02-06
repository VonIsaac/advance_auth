const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();


// creating a middleware function to check if the user is authenticated

const authenticateToken  = async (req, res, next) => {
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
        req.user = user; // Set the user to the decoded token
        next(); // Move to the next middleware
    }catch(err){
        console.log("JWT verification failed:", err.message);
        return res.status(401).json({message: "Access denied"});
    }
}

module.exports = authenticateToken;