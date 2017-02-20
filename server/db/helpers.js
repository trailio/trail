var db = require('./db');

module.exports = {
	user: {
		signup: function(username, password, email, cb) {
			db.query(`INSERT INTO testing (username, password, email) VALUES ("${username}", "${password}", "${email}")`, cb);
		},
		getAll: function(cb) {
			db.query(`SELECT * FROM testing`, cb);
		} 
	}
}