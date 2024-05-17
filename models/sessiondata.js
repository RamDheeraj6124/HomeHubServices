const mongoose = require('mongoose');
const sessionschema= new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    createdtime:{
        type:String,
        required:true,
        unique:false
    }

});

const Sdata = mongoose.model('Sdata', sessionschema);

module.exports =  Sdata;
