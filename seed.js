const artists = [
  {
  name: 'Katy Perry'
  },
  {
  name: 'Ariana Grande'
  },
  {
  name: 'Nicki Minaj'
  },
  {
  name: 'Nicki Minaj'
  },
  {
  name: 'Drake'
  },
  {
  name: 'Omarion ft. Various Artists'
  },
  {
  name: 'Mary J. Blige'
  },
]

const songs = [
    {
    title: "Swish Swish",
    link: "api.soundcloud.com/tracks/323339196",
    name: 'Katy Perry'
    },
    {
    title: "No Tears Left To Cry",
    link: 'api.soundcloud.com/tracks/444510972',
    name: 'Ariana Grande'
    },
    {
    title: "Super Bass",
    link: 'api.soundcloud.com/tracks/255821207',
    name: 'Nicki Minaj'
    },
    {
    title: "Post to Be",
    link: 'api.soundcloud.com/tracks/214183984',
    name: 'Omarion ft. Various Artists'
    },
    {
    title: "Be Happy",
    link: 'api.soundcloud.com/tracks/20449520',
    name: 'Mary J. Blige'
    },
    {
    title: "Toosie Slide",
    link: 'api.soundcloud.com/tracks/789615277',
    name: 'Drake'
    }
]

db.Artist.create(artists, function (err, createdSong) {
});

  db.Artist.find({ name: songs.name }, function (err, foundArtist) {
    db.Song.create(song, function (err, createdSong) {
      foundArtist.songs.push(createdSong);
      createdSong.name = foundArtist._id
    });
  });