var db = require('./db');


module.exports = {
	user: {
		get: function (username, cb) {
	    db.query(`SELECT * FROM profile WHERE username = "${username}"`, cb);
	  },
	  signup: function(username, password, email, cb) {
		  db.query(`INSERT INTO profile (USERNAME, PASSWORD, EMAIL) VALUES ("${username}", "${password}", "${email}")`, cb);
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
			db.query(`SELECT p.recipientUserID as recipientUserID, u.username as recipientUsername, p.longitude as longitude, p.latitude as latitude, p.imageURL as imageURL, p.publicPost as publicPost, p.timePosted as timePosted, p.timeExpired as timeExpired FROM posts p JOIN user u on p.recipientUserID = u.id WHERE p.userID = ${userID}`, cb)
		},
		getReceivedPosts: function(userID, cb) {
			db.query(`SELECT p.userID as userID, u.username as username, p.longitude as longitude, p.latitude as latitude, p.imageURL as imageURL, p.publicPost as publicPost, p.timePosted as timePosted, p.timeExpired as timeExpired FROM posts p JOIN user u on p.userID = u.id WHERE p.recipientUserID = ${userID}`, cb)
		}
	}
};
