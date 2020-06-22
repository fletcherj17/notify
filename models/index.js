const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/notify'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('MongoDB connected...')
}).catch((error)=>{
    console.log('MongoDB error', error)
});

// on disconnect add a middle ware that will send back to the user that the server is down
mongoose.on('disconnect', function () {
   // add middleware here 
});

// on reconnect remove the middleware and allow server to run as normal
mongoose.on('connect', function () {
   // add middleware here 
});

module.exports = {
    Artist: require('./Artist'),
    Song: require('./Song'),
    User: require('./User'),
    Playlist: require('./Playlist')
}