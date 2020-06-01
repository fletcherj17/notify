
//external moduled
const express = require('express');


const app = express();

//app config
const PORT = 3000;
app.set('view engine', 'ejs');


//bind server
app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}`)
});