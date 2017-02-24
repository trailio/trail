var db = require('./db');

module.exports = {
	user: {
		signup: function(username, password, email, cb) {
			db.query(`INSERT INTO user (USERNAME, PASSWORD) VALUES ("${username}", "${password}", "${email}")`, cb);
		},
		get: function(username, cb) {
			db.query(`SELECT * FROM user WHERE username = "${username}"`, cb);
		} 
	}
}