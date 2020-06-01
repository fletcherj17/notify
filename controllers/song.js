const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req,res)=> {
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

// new route
router.get("/new", (req, res)=> {
    res.render("songs/new");
});

// create route
router.post("/", (req,res)=> {
    db.Song.create(req.body, function (err, createdSong) {
        if (err) {
        console.log(err);
        res.send({ message: "Internal Server Error" });
        } else {
        res.redirect("/songs");
        }
    });
});

//show route
router.get("/:id", (req,res)=> {
    db.Song.findById(req.params.id, (err, foundSong) =>{
        if(err){
        console.log(err);
        res.send({ message: "Internal Server Error" });
        } else {
        const context = {song: foundSong}
        res.render("songs/show", context);
        }
    });
});

//edit route
router.get("/:id/edit", (req,res)=> {
    db.Song.findById(req.params.id, (err, foundSong)=>{
        if(err){
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            const context = {song: foundSong}
            res.render("songs/edit", context);
        }
    });
});

//delete route
router.delete("/:id", (req, res)=> {
    db.Song.findByIdAndDelete(req.params.id), (err, deleteSong) => {
        if(err){
            console.log(err);
            res.send({ message: "internal Server Error"});
        } else {
            res.redirect('/songs');
        }
    }
});


module.exports = router;