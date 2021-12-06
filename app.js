const express = require("express");
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const User = require('./public/models/user');
const mongoose  = require('mongoose');
//const bcrypt =  require('bcrypt');
const session =  require('express-session');

const passport = require("passport");
const LocalStrategy = require("passport-local");

mongoose.connect('mongodb://localhost:27017/resume-builder', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }  
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

const requireLogin = (req, res, next) => {
    if(!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
      return res.redirect('/login');
    }
    next();
}


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/resume", (req, res) => {
    res.render("resume");
});

app.get("/createresume", requireLogin, (req, res) => {
    res.render("createResume");
});


//Auth
app.get("/register", (req, res) => {
    res.render("register");
});

app.post('/register', async (req, res) => {
    try{
    const { password, username, email } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        res.redirect("/index");
    })
    } catch(e) {
    console.log(e);
    }
});

app.get("/login", (req, res) => { 
    res.render("login");
});

app.post("/login", passport.authenticate('local', {failureFlash: true, failureRedirect:'/' }), (req, res) => { 
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/resume');
}) 


app.listen(3000, () => {
    console.log("Resume Builder app has started!");
});




