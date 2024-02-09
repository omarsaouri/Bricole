const mongoose = require('mongoose');
const {Schema} = mongoose;

const requestSchema = new Schema({
  description: String,
  price: Number,
  city: String, // depend on it to make a good algorithm
  address: String, // full adress
  postedDate: {type: Date, default: Date.now},
  dueDate: Date,
  difficulty: String,
});

const requestModel = mongoose.model('Request', requestSchema);

module.exports = requestModel;
