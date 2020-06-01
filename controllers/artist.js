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


router.get('/new', (req,res)=>{
    res.render("artists/new");
});

router.get("/:id", function(req,res){
    db.Artist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err.errmsg);
            res.send({ message: "Internal Server Error" });
        } else {
            const context = {artist: foundArtist}
            res.render("artists/show", context);
        }
        });
    });
    router.get("/:id/edit", function(req,res){
        db.Artist.findById(req.params.id, function(err, foundArtist){
            if(err){
                console.log(err.errmsg);
                res.send({ message: "Internal Server Error" });
            } else {
                const context = {artist: foundArtist}
                res.render("artists/edit", context);
            }
            });
        });

router.post('/', (req, res)=>{
    db.Artist.create(req.body, (err, createdArtist)=>{
        if (err){
            res.send({message: 'Internal server error.'})
            console.log(err.errmsg)
        } else {
            res.redirect('/artists');
        }
    })
});





module.exports = router;
