const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
         type: String,
         required: true,
         unique: true,
    },
    password: {
         type: String,
         required: true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    role:{  // this is to differentiate between a user and an admin
     type: String, 
     enum: ['user', 'admin'],
     default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema);