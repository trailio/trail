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
    if (action.type === 'socket/searchedUser') {
        console.log('socket/searchedUser payload ==== ', action.payload);
        //action.payload should be a string that we want to search for by username in our database
        //create a friend.js file and make a routeHelper called searchUser(searchText)
          //friend.searchUser should take a searchText and return an array of all username & ID's that begin with the searchText(pattern match)
        var testData = [
        {username: 'app', id: 3}, 
        {username: 'applik', id: 5}, 
        {username: 'applied', id: 10},
        {username: 'applod', id: 7}, 
        {username: 'applinmz', id: 1}, 
        {username: 'appleofmyeye', id: 2},
        {username: 'application', id: 12}, 
        {username: 'apprizvvvee', id: 14}, 
        {username: 'appleMusic', id: 16}
        ]
        socket.emit('action', {type:'USER_SEARCHED', data: JSON.stringify(testData)});
      }

      if (action.type === 'socket/addFriend') {
        console.log('socket/addFriend payload ==== ', action.payload);
        //action.payload should be a username or a userID, undecided yet
        //in friend.js, create a routeHelper called addFriend(user)
          //friend.addFriend should take a friend and create the proper database logs for friend request / friend connection
      }
  });
  io.emit('message2', 'xxxxxxxx received from server: connection established');
});


module.exports = server;
