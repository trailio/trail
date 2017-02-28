//install and save to package json
//window.navigator.userAgent = 'react-native';

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var db = require('./db/db');
var auth = require('./auth');
var camera = require('./camera');
var cors = require('cors');

//Middleware
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var cors = require('cors');

// Pass middleware into express
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());

<<<<<<< HEAD
io.on('connection', function(socket) {
  console.log('a client just joined', socket.id);
  socket.on('message', function (message) {
    console.log('message received:', message);
  });
  socket.on('action', function(action) {
    if (action.type === 'socket/signin') {
      auth.signin(action.payload, function(token, posts) {
        console.log('index.js socket/signin - got token, emitting action with token back to app for token', token);
        socket.emit('action',
          {
            type: 'LOGIN_RESPONSE',
            data: {
              token: token,
              posts: posts || {}
            }
          });
      });
    }
    if (action.type === 'socket/signup') {
      auth.signup(action.payload, function(token) {
        console.log('index.js socket/signup - got token, emitting action with token back to app for token', token);
        socket.emit('action',
          {
            type: 'LOGIN_RESPONSE',
            data: {
              token: token,
              posts: {}
            }
          });
      });
    }
    if (action.type === 'socket/postPhoto') {
      console.log('postPhoto action.payload === ', action.payload);
      camera.post(action.payload, function(data) {
        console.log('Post photo return: ', data);
      });
    }
    if (action.type === 'socket/addFriend') {
      console.log('socket/addFriend payload ==== ', action.payload);
      //action.payload should be 
      //call routeHelper.addfriend(action.payload)
    }
  });
  io.emit('message2', 'xxxxxxxx received from server: connection established');
});


module.exports = server;
