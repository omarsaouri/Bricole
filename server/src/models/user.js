const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  password: String,
  idealDifficulty: String,
  city: String,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
