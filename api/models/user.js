var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  id: Number,
  displayName: String,
  username: String,
  email: String,
  profilePic: String,
  loginCount: Number
});