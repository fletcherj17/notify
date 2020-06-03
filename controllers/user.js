const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req,res)=>{
    res.render('users/index')
});

router.post('/login', (req, res)=>{ //any route will work
    req.session.username = req.body.username;
    req.session.logged   = true;
    console.log(req.session);
    res.redirect('/authors')
});


module.exports = router;