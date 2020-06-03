const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcryptjs');

// root route
router.get('/', (req,res)=>{
    res.render('users/index')
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
    res.render('users/login')
})
// login post
router.post('/login', (req, res)=>{ //any route will work
    req.session.name = req.body.name
    req.session.email = req.body.password;
    req.session.password = req.body.password;
    req.session.logged   = true;
    console.log(req.session);
    res.redirect('/users/index')
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