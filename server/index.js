var express = require('express');
var app = express();
var db = require('./db/db');
var auth = require('./auth');
var cors = require('cors');

//Middleware
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var cors = require('cors');

// Pass middleware into express
app.use(cors()); 
app.use(bodyParser.json());
// app.use(bodyParser.urlencodeed({extended: true}));

app.use(cookieParser());

app.post('/signup', auth.signup);
app.get('/getUsers', auth.getAll);

module.exports = app;