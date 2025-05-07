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

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Connect to the database
const PORT = process.env.PORT ;
mongoConnect();

// Create admin account
createAdminAccout();

// Use routes
app.use(authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});