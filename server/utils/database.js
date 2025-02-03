const mongoose = require('mongoose');   
const dontenv = require('dotenv')// Load environment variables from a .env file into process.env

dontenv.config(); // Load environment variables from a .env file into process.env   


const MONGO_URI = process.env.MONGO_URI; // Get the URI from the environment variables
// Connect to the MongoDB database
const mongoConnect = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Failed to connect to the database', err);
    });
}

module.exports = mongoConnect; // Export the function to connect to the database
