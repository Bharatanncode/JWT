const mongoose = require("mongoose");
const product = {
    name: String,
    price: String,
    category:String,
    userId:String,
    company:String,
  };

module.exports = mongoose.model('product', product);