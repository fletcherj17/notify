const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: {type: String, required: true},
    songs: [{
        type: mongoose.Schema.Types.ObjectId, // this will only accept mongo object ids
        ref: 'Song', // only accept ids that are from Song,
    }],
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;