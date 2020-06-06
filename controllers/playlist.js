const express = require("express");
const router = express.Router();
const db = require("../models");

//index route
router.get('/', (req,res)=>{
    db.Playlist.find({}, function(err, allPlaylists){
        if(err){
        console.log(err.errmsg);
        res.send({message: "Internal server error."});
        } else {
        const context = {playlists: allPlaylists}
        res.render("playlists/index", context);
        }
    });
});

//new route
router.get('/new', (req,res)=>{
    res.render("playlists/new");
});

//create route
router.post('/', (req, res)=>{
    db.Playlist.create(req.body, (err, createdPlaylist)=>{
        if (err){
            res.send({message: 'Internal server error.'})
            console.log(err)
        } else {
            res.redirect('/playlists');
        }
    })
});

//edit route
router.get("/:id/edit", function(req,res){
    db.Playlist.findById(req.params.id, function(err, foundPlaylist){
        if(err){
            console.log(err.errmsg);
            res.send({ message: "Internal Server Error" });
        } else {
            const context = {playlist: foundPlaylist}
            res.render("playlists/edit", context);
        }
        });
    });

//update route
router.put('/:id', (req, res)=>{
    db.Playlist.findByIdAndUpdate(req.params.id,req.body,{new:true}, function(err, updatedPlaylist){
        if (err){
            res.send({message: "Internal Server Error"})
            console.log(err)
        } else {
            res.redirect(`/playlists/${updatedPlaylist._id}`)
        }
    });
});

// show route
router.get("/:id", function(req,res){
    db.Playlist.findById(req.params.id).populate('songs songs.artist')
    .exec((err, foundPlaylist)=>{
        if (err){
            res.send("Internal Server Error")
            console.log(err)
        } else {
            const artistIds = [];
            foundPlaylist.songs.forEach(song =>{
                artistIds.push(song.artist);
            })
            const artistNames = [];
            artistIds.forEach(id =>{
                db.Artist.findById(id, (err, foundArtist)=>{
                    if (err){
                        console.log(error)
                    } else {
                        artistNames.push(foundArtist.name)
                    }
                })
            })
            console.log(artistIds)
            console.log(artistNames)
            res.render('playlists/show', {playlist: foundPlaylist})
        }
    })
});

//delete route
router.delete('/:id', (req, res)=>{
    db.Playlist.findByIdAndRemove(req.params.id, (error, deletedPlaylist)=>{
        if (error){
            console.log(error)
            res.send({message: "Internal Server Error!"})
        } else {
            db.Song.deleteMany({
                _id: {
                    $in:deletedPlaylist.songs
                }
            }, (err, data)=>{
                if (err){
                    console.log(err)
                    res.send({message: "internal server error"})
                } else {
                    res.redirect('/playlists')
                }
            })
        }
    })
});


module.exports = router;