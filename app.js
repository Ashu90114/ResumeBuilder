var express = require("express");
var app = express();
var request  = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/resume", function(req, res){
    res.render("index");
});


app.listen(3000, function(){
    console.log("Resume Builder app has started!");
});