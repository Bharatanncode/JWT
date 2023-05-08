const express = require("express");
 require('./db/config');
// const DBmodel = require("./db/config");
// const User = require("./db/user");
// const Product = require("./db/product");

// const jwt = require("jsonwebtoken");
// const jwtkey = "e-com";

const app = express();
app.use(express.json());

// api call
// app.use('/api',User);
// app.use("/api", Product);

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  // res.send(result);
  jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong , Please try after sometime" });
    }
    res.send({ user: result, auth: token });
  });
});

app.post("/login",async(req,res)=>{
   if(req.body.password && req.body.email && req.body.name){

       let user = await User.findOne(req.body).select("-password");
       //    console.log("user: ", user);
       if(user){
           res.send({user});
       }else{
           res.send({result:"No user found"})
       }
   }else{
       res.send({result:"No user found"})
   }
     
   
});

//Product create api...     
app.post("/add-product", veryfyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

//All User get.....Api.............veryfyToken Use.....

app.get("/fetch", veryfyToken, function (req, res) {
  User.find(function (err, val) {
    res.send(val);
  });
});

//All Product get.....Api.............veryfyToken Use.....

app.get("/fetch11", veryfyToken, function (req, res) {
  Product.find(function (err, val) {
    res.send(val);
  });
});

// Product List in Get Api...............................................................................
app.get("/product", async (req, res) => {
  let Products = await Product.find();
  if (Products.length > 0) {
    res.send(Products);
  } else {
    res.send({ result: "No Product found" });
  }
});

//Delete Api................

app.delete("/product/:id", async (req, res) => {
  let id_ = req.params.id;
  let result = await Product.deleteOne({ id_ });
  res.send(result);
});

//Update Api................

app.put("/product/:id", async (req, res) => {
  let id_ = req.params.id;
  // let upname =req.body.name
  let result = await Product.updateOne(
    { id_ },
    {
      $set: req.body, //{name:"vivo111111"}
    }
  );
  res.send(result);
});

// Search Api.................data get..............

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

//........................................( J. W. T. ) Code...................................................................

function veryfyToken(req, res, next) {
  // console.log("req: ", req.headers);
  var token =req.headers["authorization"];//req.body.token||req.query.token||
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtkey, function (err, authData) {
      if (err) {
        res.status(401).send("Please provide valid Token");
      } else {
        next();
      }
    });
  } else {
    res.status(403).send("Please add token with Header");
  }
}
// app.listen(5000);
