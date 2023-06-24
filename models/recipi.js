const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipischema = new Schema({
  title: String,
  description: String,
  ingredients: String,
  instructions: String,
});

module.exports = mongoose.model("recipi", recipischema);