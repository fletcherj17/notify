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
    db.Artist.find({}, (err, allArtists)=>{
        res.render("songs/new", {artists: allArtists});
    })
});

// create route
router.post("/", (req,res)=> {
    db.Song.create(req.body, function (err, createdSong) {
        if (err) {
        console.log(err);
        res.send({ message: "Internal Server Error" });
        } else {
            db.Artist.findById(req.body.artistId, (err, foundArtist)=>{
                if (err) {
                console.log(err)
                res.send({message: 'Internal Server Error'})
                } else {
                foundArtist.songs.push(createdSong);
                foundArtist.save((err, savedArtist)=>{
                    if (err){
                    console.log(err)
                    res.send("Internal Server Error")
                    } else {
                        console.log(savedArtist)
                        res.redirect('/songs')
                    }
                })
                }   
            })
        };
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

router.put("/:id", (req, res) =>{
    db.Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedSong) => {
    if(err){
        console.log(err);
        res.send({ message: "internal Server Error" })
    }   else {
        res.redirect(`/songs/${updatedSong._id}`)
    }
    })
})

//delete route
router.delete("/:id", (req, res)=> {
    db.Song.findByIdAndDelete(req.params.id, (err, deleteSong) => {
        if(err){
            console.log(err);
            res.send({ message: "internal Server Error"});
        } else {
            res.redirect('/songs');
        }
    });
});

module.exports = router;