// install and save to package json
// window.navigator.userAgent = 'react-native';

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var db = require('./db/db');
var auth = require('./auth');
var camera = require('./camera');
var friends = require('./friends');
var cors = require('cors');

//Middleware
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var cors = require('cors');

// Pass middleware into express
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());

var socketClients = {};
var socketEmit = function(userID, actionType, data) {
  io.sockets.sockets[socketClients[userID].socketID].emit('action', {
    type: actionType,
    data: data
  });
};

io.on('connection', function(socket) {
  console.log('a client just joined', socket.id);

  // io.sockets.socket(socketClients[<userID>].socket).emit('testing', 'meowth!!!!!!/?????!?!?!?')
  socket.on('action', function(action) {

    if (action.type === 'socket/autosignin') {
      auth.check(action.payload, function(token, user) {
        if (!(token)) {
          console.log('autosignin failed, no socket data returned');
        } else {
          auth.getAccountData(token, user, function (token, username, userID, posts, friendList, receivedFriendRequests, sentFriendRequests) {
            // console.log('all this stuff', posts, friendList, receivedFriendRequests, sentFriendRequests)
            socketClients[userID] = {'socketID': socket.id};
            socketEmit(userID, 'LOGIN_RESPONSE', {
              username: username,
              id: userID,
              token: token,
              posts: posts || {},
              friendList: friendList || [{username: 'testUser23', id: 3}, {username: 'testUser41', id: 5}, {username: 'testUser352', id: 7}, {username: 'testUser095', id: 1}],
              receivedFriendRequests: receivedFriendRequests || [{username: 'receivedReqUser1', id: 9999}, {username: 'receivedReqUser2', id: 9998}, {username: 'receivedReqUser3', id: 9997}],
              sentFriendRequests: sentFriendRequests || [{username: 'sentReqUser1', id: 1008}, {username: 'sentReqUser2', id: 1009}, {username: 'sentReqUser3', id: 1007}]
            });
          });
        }
      });
    }

    if (action.type === 'socket/signin') {
      auth.signin(action.payload, function(token, user){
        if (!(token)) {
          console.log('signin failed, no socket data returned');
        } else {
          auth.getAccountData(token, user, function (token, username, userID, posts, friendList, receivedFriendRequests, sentFriendRequests) {
            // console.log('all this stuff', posts, friendList, receivedFriendRequests, sentFriendRequests)
            socketClients[userID] = {'socketID': socket.id};
            socketEmit(userID, 'LOGIN_RESPONSE', {
              username: username,
              id: userID,
              token: token,
              posts: posts || {},
              friendList: friendList || [{username: 'testUser23', id: 3}, {username: 'testUser41', id: 5}, {username: 'testUser352', id: 7}, {username: 'testUser095', id: 1}],
              receivedFriendRequests: receivedFriendRequests || [{username: 'receivedReqUser1', id: 9999}, {username: 'receivedReqUser2', id: 9998}, {username: 'receivedReqUser3', id: 9997}],
              sentFriendRequests: sentFriendRequests || [{username: 'sentReqUser1', id: 1008}, {username: 'sentReqUser2', id: 1009}, {username: 'sentReqUser3', id: 1007}]
            });
          })
        }
      })
    }

    if (action.type === 'socket/signup') {
      auth.signup(action.payload, function(token, username, userID) {
        // console.log('index.js socket/signup - got token, emitting action with token back to app for token', token);
        socketClients[userID] = {'socketID': socket.id};
        socketEmit(userID, 'LOGIN_RESPONSE', {
          username: username,
          id: userID,
          token: token,
          posts: {},
          friendList: [],
          receivedFriendRequests: [],
          sentFriendRequests: []
        });
      });
    }

    if (action.type === 'socket/postPhoto') {
      console.log('postPhoto action.payload === ', action.payload);
      camera.post(action.payload, function(createdPost) {
        console.log('index.js Post photo return: ', createdPost);
        if (createdPost) {
          createdPost.username = action.payload.username;
          socketEmit(createdPost.userid, 'POST_SENT', createdPost); 
          createdPost.username = createdPost.recipientusername;
          delete createdPost.recipientusername;
          createdPost.recipientuserid.forEach(function(recipient) {
            if(socketClients[recipient]) {
              socketEmit(recipient, 'POST_RECEIVED', createdPost);
            }
          })
        } else {
          console.log('camera.js post - either public post was created or no post created');
        }
      });
    }

    if (action.type === 'socket/searchedUser') {
      console.log('socket/searchedUser payload ==== ', action.payload);
      friends.search(action.payload.searchText.toLowerCase(), action.payload.userID, function(data) {
        console.log('returning search results for friend search');
        socketEmit(action.payload.userID, 'USER_SEARCHED', data)
      });
    }

    if (action.type === 'socket/addFriend') {
      console.log('socket/addFriend payload ==== ', action.payload);
      friends.add(action.payload.user.id, action.payload.friend.id, function(confirmation){
        if (confirmation === 'FRIENDSHIP CONFIRMED') {
          socketEmit(action.payload.user.id, 'FRIEND_ADDED', action.payload.friend);
          if (socketClients[action.payload.friend.id]) {
            socketEmit(action.payload.friend.id, 'FRIEND_ADDED', action.payload.user);
          }
        } else if (confirmation === 'REQUEST SENT') {
          socketEmit(action.payload.user.id, 'FRIEND_REQUEST_OUTGOING', action.payload.friend);
          if (socketClients[action.payload.friend.id]) {
            socketEmit(action.payload.friend.id, 'FRIEND_REQUEST_INCOMING', action.payload.user);
          }
        }
      });

    }

    if (action.type === 'socket/removeFriend') {
      console.log('socket/addFriend payload ==== ', action.payload);
      friends.remove(action.payload.primaryID, action.payload.friendID, function(confirmation){
        if (confirmation) {
          socketEmit(action.payload.primaryID, 'FRIEND_REMOVED', action.payload.friendID);
          if (socketClients[action.payload.friendID]) {
            socketEmit(action.payload.friendID, 'FRIEND_REMOVED', action.payload.primaryID);
          }
        }
      });
    }
  });
});


module.exports = server;

// sample socket code
      // if (socketClients[1]) {
      //   io.sockets.sockets[socketClients[1].socket].emit('action',
      //     {
      //       type: 'TESTING',
      //       data: action.payload.searchText
      //     })
      // }


      // io.emit('message2', 'xxxxxxxx received from server: connection established');
