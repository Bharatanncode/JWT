const express  = require("express");
const router = express.Router();
const Product = require('../db/product');
const jwt = require('jsonwebtoken');
const jwtkey ="e-com";
const DBmodel = require('../db/config');



  function veryfyToken(req,res,next){
    // console.log("req: ", req.headers);
    var  token=req.headers["authorization"];
    if(token){
 token=token.split(' ')[1];
 jwt.verify(token,jwtkey,function(err,authData){
    if(err){
        res.status(401).send("Please provide valid Token")
    }else{
        next();
    }
 })
    }else{
      res.send("Token is not valid") 
    }
    
 }
//All data get.....

router.get("/fetch",veryfyToken, function (req, res) {
    Product.find(function (err, val) {
        res.send(val);
    });
  });
 


  module.exports = router;