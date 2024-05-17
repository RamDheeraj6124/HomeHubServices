
const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    value: Number
  });
const Rating = mongoose.model("Rating", ratingSchema);
module.exports =Rating;