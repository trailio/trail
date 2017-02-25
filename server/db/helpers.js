var db = require('./db');

module.exports = {
	user: {
		signup: function(username, password, email, cb) {
			db.query(`INSERT INTO user (USERNAME, PASSWORD) VALUES ("${username}", "${password}", "${email}")`, cb);
		},
		get: function(username, cb) {
			db.query(`SELECT * FROM user WHERE username = "${username}"`, cb);
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