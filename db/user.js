const mongoose = require("mongoose");
const user = {
    name: String,
    email: String,
    password:String
  };

module.exports = mongoose.model('user', user);