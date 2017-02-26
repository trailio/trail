var db = require('./db');

module.exports = {
	user: {
		get: function (username, cb) {
	    db.query(`SELECT * FROM user WHERE username = "${username}"`, cb);
	  },
	  signup: function(username, password, email, cb) {
		  db.query(`INSERT INTO user (USERNAME, PASSWORD, EMAIL) VALUES ("${username}", "${password}", "${email}")`, cb);
		}
	},
	posts: {
		post: function(longitude, latitude, imageURL, publicPost, cb) {
			db.query(`INSERT INTO posts (LONGITUDE, LATITUDE, IMAGEURL, PUBLICPOST) VALUES ("${longitude}", "${latitude}", "${imageURL}", "${publicPost}")`, cb);
		},
		get: function(cb) {
			db.query(`SELECT * FROM posts`, cb);
		}
	}
};
