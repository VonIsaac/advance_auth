const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


// creating a middleware function to check if the user is authenticated

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(' ')[1]; // Get the token from the header
    // If the token is not present, return an error
    if(!token){
        return res.status(401).json({message: "Access denied"}); 
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        console.log(decoded);
        req.user = decoded; // Set the user to the decoded token
        next(); // Move to the next middleware
    }catch(err){
        console.log(err);
        return res.status(401).json({message: "Access denied"});
    }

}

module.exports = authenticateToken;