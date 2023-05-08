const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/E-comerc", (err) => {
  if (!err) {
    console.log("connected to db, Port......  (5000)");
  } else {
    console.log("error", err);
  }
});
