var jwt = require('jwt-simple');
var db = require('./db/helpers');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
// require('body-parser');

module.exports = {
  signup: function(payload, cb) {
    db.user.get(payload.username, function(result) {
      if (result.length !== 0) {
        console.log('User already exists');
      } else {
        bcrypt.hashAsync(payload.password, null, null)
          .then(function(hash) {
            var signupWithHash = {
              username: payload.username,
              password: hash,
              email: payload.email
            };
            db.user.signup(signupWithHash, function(result) {
              if (result) {
                db.user.get(payload.username, function(result) {
                  if (result.length === 0) {
                    console.log('User does not exist');
                  } else {
                    cb(jwt.encode(result[0], '53cr3t'));
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
    db.user.get(payload.username, function(result) {
      if (result.length === 0) {
        console.log('User does not exist');
      } else {
        var user = result[0];
        bcrypt.compareAsync(payload.password, user.password)
          .then(result => {
            if (result) {
              var token = jwt.encode(payload.username, '53cr3t');
              var posts = {};
              db.posts.getSentPosts(user.id, function(results) {
                posts.sent = results;
                db.posts.getReceivedPosts(user.id, function(results) {
                  posts.received = results;
                  cb(token, posts);
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
  }
  // check: function(token, cb) {
  // 	//checks for authentication, implement this is any other route helper files so at the beginning of the function
  // 	//so that the function is only executed if token is provided
  // 	//when implementing this function in other files, make sure the client side sends a token for every socket connection it makes
  //   if ((token !== undefined) && (token !== 'undefined')) {
  //     var user = jwt.decode(token, '53cr3t');
  //     db.user.get(user.username, function (err, rows) {
  //       if (rows.length === 1) {
  //         cb(rows[0]);
  //       } else {
  //         cb(null);
  //       }
  //     });
  //   } else {
  //     console.log('No token provided');
  //   }
  // }
}
