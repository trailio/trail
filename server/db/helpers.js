var db = require('./db');


module.exports = {
  user: {
    get: function (username, cb) {
      db.any('SELECT * FROM profile WHERE username=$1', username)
        .then(function(data) {
          cb(data);
        })
				.catch(function(error) {
					console.log('ERROR: ', error);
				})
	  },
	  signup: function(loginDetails, cb) {
		  // db.query(`INSERT INTO profile (USERNAME, PASSWORD, EMAIL) VALUES ("${username}", "${password}", "${email}")`, cb);
			var values = [loginDetails.username, loginDetails.password, loginDetails.email];
			db.one('INSERT INTO profile(username, password, email) VALUES($1, $2, $3) returning id', values)
				.then(function(result) {
					cb(result);
				})
				.catch(function(error) {
					console.log('ERROR: ', error);
				});
		}
	},
	posts: {
		post: function(longitude, latitude, imageURL, publicPost, cb) {
			db.query(`INSERT INTO posts (LONGITUDE, LATITUDE, IMAGEURL, PUBLICPOST) VALUES ("${longitude}", "${latitude}", "${imageURL}", "${publicPost}")`, cb);
		},
		get: function(cb) {
			db.query(`SELECT * FROM posts`, cb);
		},
		getSentPosts: function(userID, cb) {
			db.query('SELECT p.recipientUserID as recipientUserID, u.username as recipientUsername, p.longitude as longitude, p.latitude as latitude, p.imageURL as imageURL, p.publicPost as publicPost, p.timePosted as timePosted, p.timeExpired as timeExpired FROM posts p JOIN profile u on p.recipientUserID = u.id WHERE p.userID = $1', userID)
        .then(function(data) {
          cb(data);
        })
        .catch(function(error) {
          console.log('ERROR: ', error);
        });
		},
		getReceivedPosts: function(userID, cb) {
			db.query('SELECT p.userID as userID, u.username as username, p.longitude as longitude, p.latitude as latitude, p.imageURL as imageURL, p.publicPost as publicPost, p.timePosted as timePosted, p.timeExpired as timeExpired FROM posts p JOIN profile u on p.userID = u.id WHERE p.recipientUserID = $1', userID)
      .then(function(data) {
        cb(data);
      })
      .catch(function(error) {
        console.log('ERROR: ', error);
      });
		}
	}
};
