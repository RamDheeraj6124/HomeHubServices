// Assuming you have mongoose imported and connected already
const mongoose = require('mongoose');
process.env.TZ = 'Asia/Kolkata';

// Define Log schema
const logSchema = new mongoose.Schema({
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    doneby_user_name:{type:String, required:true},
    doneby_user_role:{type:String,required:true},
    doneby_user_email:{type:String,required:true},
    performedonuser: {type:String,required:true},
    performedonuser_initialrole:{type:String,required:true},
    performedonuser_newrole: {type:String,required:true}})

// Create Log model
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
