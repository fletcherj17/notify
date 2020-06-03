
//external modules
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const controllers = require('./controllers')
const session = require('express-session');


//app config
const PORT = 3000;
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(
    session({ // adds sessions to server
    store: new MongoStore({
        url: "mongodb://localhost:27017/notify"
    }),
    secret: "dlfDJMskGwd495ft20JSD", //a random string
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks (in seconds)
    }
}));

//root routes
app.get("/", function (req, res) {
    res.render("index");
});

// artist route
app.use("/artists", controllers.artist);
// song route
app.use("/songs", controllers.song);
//user route
app.use("/users", controllers.user);

//bind server
app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}`)
}); 