const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
//const User = require('../models/User');
dotenv.config();


// creating a middleware function to check if the user is authenticated

const authenticateToken  = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token", err });
    }
   
};

// Role-based access control (RBAC)
const authorize = (requiredRoles) => {
    return (req, res, next) => {
        // check if the user role is in the roles array
         if (req.user && requiredRoles.includes(req.user.role)) {
          return next();
        } else {
          return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    }
}

module.exports = { authenticateToken, authorize }; 