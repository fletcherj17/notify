const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req,res)=>{
    db.Artist.find({}, function(err, allArtists){
        if(err){
        console.log(err.errmsg);
        res.send({message: "Internal server error."});
        } else {
        const context = {artists: allArtists}
        res.render("artists/index", context);
        }
    });
});

router.get('/:id', (req,res)=>{
    res.render('artists/show', req.params.id)
});

module.exports = router;
