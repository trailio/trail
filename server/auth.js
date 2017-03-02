var jwt = require('jwt-simple');
var db = require('./db/helpers');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
// require('body-parser');

module.exports = {
  signup: function(payload, cb) {
    db.user.get(payload.usernameText, function(result) {
      if (result.length !== 0) {
        console.log('User already exists');
      } else {
        bcrypt.hashAsync(payload.passwordText, null, null)
          .then(function(hash) {
            var signupWithHash = {
              username: payload.usernameText,
              password: hash,
              email: payload.email
            };
            db.user.signup(signupWithHash, function(result) {
              if (result) {
                db.user.get(payload.usernameText, function(result) {
                  if (result.length === 0) {
                    console.log('User does not exist');
                  } else {
                    cb(jwt.encode(result[0], '53cr3t'), result[0].username, result[0].id);
                  }
                });
              }
            });
          })
          .catch(function(error) {
            console.log('Failed to hash password: ', error);
          });
      }
    });
  },
  signin: function(payload, cb) {
    db.user.get(payload.usernameText, function(result) {
      if (result.length === 0) {
        console.log('User does not exist');
      } else {
        var user = result[0];
        bcrypt.compareAsync(payload.passwordText, user.password)
          .then(result => {
            if (result) {
              var token = jwt.encode(payload.usernameText, '53cr3t');
              var posts = {};
              db.posts.getSentPosts(user.id, function(sentResults) {
                posts.sent = sentResults;
                db.posts.getReceivedPosts(user.id, function(receivedResults) {
                  posts.received = receivedResults; 
                  db.user.getIDUsername(user.friends, function(friends){
                    console.log(`found friends of ${payload.usernameText}: ${friends}`);
                    cb(token, user.username, user.id, posts, friends);
                  })  
                });
              });
            } else {
              console.log('invalid password for username: ', username);
            }
          }).catch(err => {
            console.log('Invalid password: ', err);
          });
      }
    });
  },
  check: function(token, cb) {
//checks for authentication, implement this is any other route helper files so at the beginning of the function
//so that the function is only executed if token is provided
//when implementing this function in other files, make sure the client side sends a token for every socket connection it makes
    if ((token !== undefined) && (token !== 'undefined')) {
      var username = jwt.decode(token, '53cr3t');
      db.user.get(username, function (result) {
        if (result.length === 1) {
          cb(result[0]);
        } else {
          cb(null);
        }
      });
    } else {
      console.log('No token provided');
    }
  }
};
