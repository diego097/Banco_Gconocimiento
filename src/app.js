const express = require("express");
const bodyParser = require("body-parser");
const hbs = require('express-handlebars')
var path = require("path");
const Router = require('./routes/index')
const app = express();
//const Router = require('./src/routes/index')

//Midlewards
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')


//app.use(Router)
app.use(Router)

module.exports = app;