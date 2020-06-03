const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    songs: [{
        type: mongoose.Schema.Types.ObjectId, // this will only accept mongo object ids
        ref: 'Song', // only accept ids that are from Song,
    }],
    });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;