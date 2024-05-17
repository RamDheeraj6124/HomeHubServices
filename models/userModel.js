

// models/userModel.js
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    otp: {
        type: String
    },
    otpExpiration: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 0, 
        
    }
});

const User = mongoose.model('User', userSchema);

module.exports =  User;
