var db = require('./db/helpers');
require('body-parser');

module.exports = {
	signup: function(req, res, next) {
		console.log('signup request received');
		console.log('!!!!!!!!!!!!!!!!!req.body', req.body)
		var username = req.body.username;
		var password = req.body.password;
		var email = req.body.email;

		db.user.signup(username, password, email, function(err, rows) {
			if (err) {
				next(new Error('User already exits'));
			}
			console.log('signup response: ', rows);
			res.end(rows);
		})
	},
	getAll: function(req, res, next) {
		db.user.getAll(function(err, rows) {
			if (err) {
				// next(new Error('User already exits'));
				console.log('err', err)
			}
			console.log('getAll response: ', rows);
			res.end(rows);
		})
	}
}