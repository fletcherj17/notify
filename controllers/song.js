const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req,res)=>{
    db.Song.find({}, function(err, allSongs ){
        if(err){
            console.log(err);
            res.send({message: "Internal Server Error"});
        }   else {
            const context = {songs: allSongs}
            res.render("songs/index", context);
            }
    });
});

router.get('/new', (req,res)=>{
    res.render("songs/new");
});

module.exports = router;