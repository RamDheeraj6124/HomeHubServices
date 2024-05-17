// models/searchlist.js
const mongoose = require('mongoose');
const searchSchema = new mongoose.Schema({
    service:{type:String,required:true},
    link:{type:String,required:false}
});

const Search = mongoose.model('Search', searchSchema);

module.exports =  Search;
