
//external moduled
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

//app config
const PORT = 3000;
app.set('view engine', 'ejs');

//middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

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