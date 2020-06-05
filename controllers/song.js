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
        db.Playlist.find({}, (err, allPlaylists)=>{ 
        res.render("songs/new", {artists: allArtists, playlists: allPlaylists});
        })
    });
});

// create route
router.post("/", (req,res)=> {
    db.Song.create(req.body, function (err, createdSong) {
        if (err) {
        console.log(err);
        res.send({ message: "Internal Server Error" });
        } else {
            db.Artist.findById(req.body.artist, (err, foundArtist)=>{
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
                    }
                })
                }   
            })
            db.Playlist.findById(req.body.playlistId, (err, foundPlaylist)=>{
                if (err) {
                console.log(err)
                res.send({message: 'Internal Server Error'})
                } else {
                console.log(foundPlaylist)
                foundPlaylist.songs.push(createdSong);
                foundPlaylist.save((err, savedPlaylist)=>{
                    if (err){
                    console.log(err)
                    res.send("Internal Server Error")
                    } else {
                        console.log(savedPlaylist)
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
    db.Artist.findOne({'songs': req.params.id}).populate({
        path: 'songs',
        match: {_id: req.params.id}
    }).exec((err, foundArtist)=>{
        if (err){
            res.send("internal server error. :(")
            console.log(err)
        } else {
            console.log(foundArtist)
            res.render('songs/show', {artist: foundArtist,
            song: foundArtist.songs[0]})
        }
        })
    });

//edit route
router.get("/:id/edit", (req,res)=> {
    db.Song.findById(req.params.id, (err, foundSong)=>{
            db.Playlist.find({}, (err, allPlaylists)=>{ 
        if(err){
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            res.render("songs/new", {playlists: allPlaylists, song: foundSong});
        }
    });
});
});

//update route
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
    db.Song.findByIdAndRemove(req.params.id, (err, deletedSong) => {
    db.Artist.findOne({'songs': req.params.id}, (err, foundArtist)=>{
        if(err){
            console.log(err);
            res.send({ message: "internal Server Error"});
        } else {
            foundArtist.songs.remove(req.params.id);
            foundArtist.save((err,updatedArtist)=>{
                if (err){
                    console.log(err);
                res.send({ message: "internal Server Error"});
                } else {
                    res.redirect('/songs')
                }
                });
            };
        });
    });
});

module.exports = router;