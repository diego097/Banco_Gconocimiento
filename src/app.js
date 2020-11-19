const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs')
var path = require("path");
const Router = require('./routes/index')
const app = express();
//const Router = require('./src/routes/index')

//Midlewards
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//app.use(Router)
app.use(Router)

module.exports = app;