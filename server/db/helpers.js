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
	publicPosts: {
		post: function(longitude, latitude, imageURL) {
			db.query(`INSERT INTO posts (LONGITUDE, LATITUDE, IMAGEURL) VALUES ("${longitude}", "${latitude}", "${imageURL}")`, cb);
		},
		get: function(cb) {
			db.query(`SELECT * FROM posts`, cb);
		} 
	},
	publicPosts: {
		post: function(longitude, latitude, imageURL) {
			db.query(`INSERT INTO publicPosts (LONGITUDE, LATITUDE, IMAGEURL) VALUES ("${longitude}", "${latitude}", "${imageURL}")`, cb);
		},
		get: function(cb) {
			db.query(`SELECT * FROM publicPosts`, cb);
		} 
	}
};

