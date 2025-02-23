// Load environment variables first
require('dotenv').config();

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI; // Get the URI from the environment variables

// Debug: Log the URI to verify it's loaded correctly (remove in production)
// console.log('Mongo URI:', MONGO_URI);

const mongoConnect = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Failed to connect to the database', err);
    });
};

module.exports = mongoConnect;
