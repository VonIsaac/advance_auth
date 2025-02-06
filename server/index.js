const path = require('path')    

const express  = require('express')

const mongoConnect = require('./utils/database') // Import the function to connect to the database

const app = express() // Create the Express app
const cookieParser = require('cookie-parser') 
const dotenv = require('dotenv') // Load environment variables from a .env file into process.env
const cors = require('cors')

// routes 
const authRoutes = require('./routes/auth')
const auhtMiddleware = require('./middleware/middleware')

dotenv.config() 

// Serve the static files from the React app
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// An api endpoint that returns a short list of items
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses form-urlencoded requests
app.use(cookieParser()); // Parses cookies attached to the client request
app.use(cors()) 



// Connect to the database
const PORT = process.env.PORT || 8000;
mongoConnect();


// Use the routes
app.use(authRoutes)
app.use(auhtMiddleware) // authentication to all request 


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})