const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcryptjs');

// root route
router.get('/index', (req,res)=>{
    res.render('users/index', {user: req.session.currentUser})
});

// register form
router.get('/signup', (req, res)=>{
    res.render('users/new')
})

// register post
router.post("/signup", async function (req, res) {
    try {
      // access the req.body
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
      // create user with req.body and hash password
    const newUser = await db.User.create(req.body);
      // redirect to login
    console.log(newUser)
    res.redirect("/login");
    } catch (err) {
    res.send({ message: "Internal Server Error", error: err });
    }
});


// login form
router.get('/login', (req, res)=>{
    res.render('users/login', {message: ''})
})
// login post
router.post("/login", async function (req, res) {
    try {
      // see if user with email exists
    const foundUser = await db.User.findOne({ email: req.body.email });
      // if they do not exist send error
    if (!foundUser) {
        return res.render('users/login',{ message: "Incorrect e-mail, or user does not exist." });
    }
      // if they do compare password with hash
    const match = await bcrypt.compare(req.body.password, foundUser.password);
      // if not match send error
    if (!match) {
        return res.render('users/login', {message: 'Incorrect password'});
    }
      // if match create session for authentication
    req.session.currentUser = {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
    };
    console.log(req.session.currentUser);
      // redirect to home
    res.redirect("/index");
    } catch (err) {
    res.send({ message: "Internal Server Error", error: err });
    console.log(err)
    }
});

// logout
router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send({message: 'Internal Server Error'})
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router;
