const db = require('../models')

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

artists.forEach(artist =>{
  db.Artist.create(artist, function (err, createdArtist) {
    console.log("createdArtist", createdArtist)
  });
})
