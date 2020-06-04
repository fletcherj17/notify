const express = require("express");
const router = express.Router();
const db = require("../models");

//index route
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


//new route
router.get('/new', (req,res)=>{
    res.render("artists/new");
});

//create route
router.post('/', (req, res)=>{
    db.Artist.create(req.body, (err, createdArtist)=>{
        if (err){
            res.send({message: 'Internal server error.'})
            console.log(err.errmsg)
        } else {
            res.redirect('/artists/'+createdArtist._id);
        }
    })
});

//edit route
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

//update route
router.put('/:id', (req, res)=>{
    db.Artist.findByIdAndUpdate(req.params.id,req.body,{new:true}, function(err, updatedArtist){
        if (err){
            res.send({message: "Internal Server Error"})
            console.log(err)
        } else {
            res.redirect(`/artists/${updatedArtist._id}`)
        }
    });
});

// show route
router.get("/:id", function(req,res){
    db.Artist.findById(req.params.id).populate({path: 'songs'})
    .exec((err, foundArtist)=>{
        if (err){
            res.send("Internal Server Error")
            console.log(err)
        } else {
            res.render('artists/show', {artist: foundArtist})
        }
    })
});

//delete route
router.delete('/:id', (req, res)=>{
    db.Artist.findByIdAndRemove(req.params.id, (error, deletedArtist)=>{
        if (error){
            console.log(error)
            res.send({message: "Internal Server Error!"})
        } else {
            db.Song.deleteMany({
                _id: {
                    $in:deletedArtist.songs
                }
            }, (err, data)=>{
                if (err){
                    console.log(err)
                    res.send({message: "internal server error"})
                } else {
                    res.redirect('/artists')
                }
            })
        }
    })
});





module.exports = router;
