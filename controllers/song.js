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

// route for new song
router.get("/new", function (req, res) {
    res.render("songs/new");
});

module.exports = router;