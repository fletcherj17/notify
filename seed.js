const db = require('./models')

const artists = [
  {
  name: 'Katy Perry',
  songs: []
  },
  {
  name: 'Ariana Grande',
  songs: []
  },
  {
  name: 'Nicki Minaj',
  songs: []
  },
  {
  name: 'Drake',
  songs: []
  },
  {
  name: 'Omarion ft. Various Artists',
  songs: []
  },
  {
  name: 'Mary J. Blige',
  songs: []
  },
]

const songs = [
    {
    title: "Swish Swish",
    link: "api.soundcloud.com/tracks/323339196",
    artist: 'Katy Perry'
    },
    {
    title: "No Tears Left To Cry",
    link: 'api.soundcloud.com/tracks/444510972',
    artist: 'Ariana Grande'
    },
    {
    title: "Super Bass",
    link: 'api.soundcloud.com/tracks/255821207',
    artist: 'Nicki Minaj'
    },
    {
    title: "Post to Be",
    link: 'api.soundcloud.com/tracks/214183984',
    artist: 'Omarion ft. Various Artists'
    },
    {
    title: "Be Happy",
    link: 'api.soundcloud.com/tracks/20449520',
    artist: 'Mary J. Blige'
    },
    {
    title: "Toosie Slide",
    link: 'api.soundcloud.com/tracks/789615277',
    artist: 'Drake'
    }
]
/* artists.forEach(artist =>{
  db.Artist.create(artist, function (err, createdArtist) {
    console.log(createdArtist)
  });
}) */

songs.forEach(song =>{
  db.Artist.find({ name: song.artist }, function (err, foundArtist) {
    console.log(foundArtist)
    db.Song.create(song, function (err, createdSong) {
      console.log(createdSong)
      foundArtist[0].songs.push(createdSong);
      createdSong.artist = foundArtist[0]._id
      createdSong.save();
    });
  });
});