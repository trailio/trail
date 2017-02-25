var jwt = require('jwt-simple');
var db = require('./db/helpers');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
// require('body-parser');

module.exports = {
  signup: function({username, password, email}, cb) {
	console.log('signup request received for username' + username + 'password' + password + 'email'+email);
		
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
              	console.log('xxxx signed up user ', rows);

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
                      console.log('user details xxxxxx', rows[0]);
                      var user = rows[0];
                      var token = jwt.encode(user, 'secret');
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


		// db.user.signup(username, password, email, function(err, rows) {
		// 	if (err) {
		// 		console.log('User already exits');
		// 	}
		// 	console.log('signup response: ', rows);
		// 	res.end(JSON.stringify(rows));
		// })
	getAll: function(req, res, next) {
		db.user.getAll(function(err, rows) {
			if (err) {
				// console.log('User already exits');
				console.log('err', err)
			}
			console.log('getAll response: ', rows);
			res.end(JSON.stringify(rows));
		})
	}







}










