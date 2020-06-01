const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    link: {type: String, required: true, unique: true}
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;