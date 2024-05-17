// models/userModel.js
const mongoose = require('mongoose');
const forgotschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true,       
    }
});
const otp = mongoose.model('forgot', forgotschema);
module.exports =  otp;
