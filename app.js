const express = require("express");
const app = express();
const request  = require("request");
const path = require('path');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/index", function(req, res){
    res.render("index");
});

app.get("/resume", function(req, res){
    res.render("resume");
});

app.get("/createresume", function(req, res){
    res.render("createResume");
});


app.listen(3000, function(){
    console.log("Resume Builder app has started!");
});




