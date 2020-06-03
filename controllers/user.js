const express = require("express");
const router = express.Router();
const db = require("../models");


// root route
router.get('/', (req,res)=>{
    res.render('users/index')
});

// register form
router.get('/signup', (req, res)=>{
    res.render('users/new')
})

// register post
router.post('/signup', async (req, res)=>{})
    //access req.body
    //search db for user with existing email
    //if found , send error
    //if not, we hash password and create user
    //redirect to login

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