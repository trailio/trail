var jwt = require('jwt-simple');
var db = require('./db/helpers');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
// require('body-parser');

module.exports = {
  signup: function({username, password, email}, cb) {
    db.user.get(username, function (err, rows) {
      if (err) {
        console.log('Failed to connect to database');
      }
      if (rows.length !== 0) {
        console.log('User already exists');
      } else {
         bcrypt.hashAsync(password, null, null)
          .then(function(hash) {
            db.user.signup(username, hash, email, function (err, rows) {
              if (err) {
                console.log('Failed to create user');
              } else {
              	//this section is to populate the other database tables using insertID at this account's userID
                // req.body.userID = rows.insertId;
                // db.profile.post(req.body, function (err, rows) {
                //   if (err) {
                //     console.log('Failed to create profile');
                //   }

                //this section grabs the user's account info and encrypts it in a jwt token
                  db.user.get(username, function(err, rows) {
                    if (err) {
                      console.log('Failed to connect to database');
                    } else if (rows.length === 0) {
                      console.log('User does not exist');
                    } else {
                      // console.log('user details xxxxxx', rows[0]);
                      var user = rows[0];
                      var token = jwt.encode(user, '53cr3t');
                      cb(token);
                    }
                  });
                // });
              }
            });
          }).catch(err => {
            console.log('Failed to hash password');
          });
      }
    })
  },
  signin: function({username, password}, cb){
  	db.user.get(username, function(err, rows) {
	    if (err) {
	      console.log('Failed to connect to database');
	    } else if (rows.length === 0) {
	      console.log('User does not exist');
	    } else {
	      // console.log('user details xxxxxx', rows[0]);
	      var user = rows[0];
				bcrypt.compareAsync(password, user.password).then(result => {
          if (result) {	
          	var token = jwt.encode(user, '53cr3t');
            var posts = {};
          	db.posts.getSentPosts(user.id, function(err, sentPosts) {
              console.log('sentPosts', sentPosts);
              posts.sent = sentPosts;
              db.posts.getReceivedPosts(user.id, function(err, receivedPosts) {
                console.log('receivedPosts', receivedPosts)
               posts.received = receivedPosts;
                cb(token, posts);  
              })
            })  
          } else {
          	console.log('invalid password for username: ', username);
          }
	    	}).catch(err => {
	    		console.log('Invalid password')
	    	})
	    }
	  });
  },
  check: function(token, cb) {  
  	//checks for authentication, implement this is any other route helper files so at the beginning of the function
  	//so that the function is only executed if token is provided
  	//when implementing this function in other files, make sure the client side sends a token for every socket connection it makes
    if ((token !== undefined) && (token !== 'undefined')) {
      var user = jwt.decode(token, '53cr3t');
      db.user.get(user.username, function (err, rows) {
        if (rows.length === 1) {
          cb(rows[0]);
        } else {
          cb(null);
        }
      });
    } else {
      console.log('No token provided');
    }
  }
}










