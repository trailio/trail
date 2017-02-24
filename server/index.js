//install and save to package json
//window.navigator.userAgent = 'react-native';

//index.js


var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);	
var io = require('socket.io')(server);

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

io.on('connection', (socket) => {
	console.log('a client just joined', socket.id);
	socket.on('message', (message) => {
		console.log('message received:', message);
	});
	socket.on('action', (action) => {
		if (action.type === 'socket/hello') {
      	  console.log('Got hello data!', action.foodtype);
     	  socket.emit('action', {type:'message', foodtype:'good day!'});
    	}
    	if (action.type === 'socket/signin') {
    	  console.log('got username & password', action.payload)
    	  socket.emit('action', {type:'message', data:'good day!'});
    	}
  	});
	io.emit('message2', 'xxxxxxxx received from server: connection established');
});


module.exports = server;
