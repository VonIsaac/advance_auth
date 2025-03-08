const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();


// creating a middleware function to check if the user is authenticated

const authenticateToken  = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token.split(" ")[1], "secretKey");
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token", err });
    }
   
};

// Role-based access control (RBAC)
/*const authorize = (roles) => {
    return (req, res, next) => {
        // check if the user role is in the roles array
        if(!roles.includes(req.user.role)){ // If the user role is not in the roles array
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }
        next(); // Move to the next middleware
    }
}*/

module.exports = { authenticateToken }; // Export the middleware functions