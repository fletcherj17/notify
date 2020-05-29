const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/notify'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('MongoDB connected...')
}).catch((error)=>{
    console.log('MongoDB error', error.errmsg)
});

module.exports = {
    Artist: require('./Artist'),
    Song: require('./Song'),
    User: require('./User')
}