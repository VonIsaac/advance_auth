const path = require('path')    

const express  = require('express')

const mongoConnect = require('./utils/database') // Import the function to connect to the database

const app = express() // Create the Express app
const cookieParser = require('cookie-parser') 
const dotenv = require('dotenv') // Load environment variables from a .env file into process.env
const cors = require('cors')

// routes 
const authRoutes = require('./routes/auth')

//admin
const {createAdminAccout} = require('./admin/admin')

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
app.use(cors({
    origin: 'http://localhost:5173', // Specify the frontend origin
    credentials: true, // Allow cookies and authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



// Connect to the database
const PORT = process.env.PORT || 8000;
mongoConnect();


createAdminAccout() // call the function to create an admin account
// Use the routes
app.use(authRoutes) // available to all views



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})