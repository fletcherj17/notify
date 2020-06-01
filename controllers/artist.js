const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req,res)=>{
    res.render('artists/index')
});

router.get('/', (req,res)=>{
    res.render('artists/index')
});

module.exports = router;

