var jwt = require('jwt-simple');
var db = require('./db/helpers');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
// require('body-parser');

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
			res.end(JSON.stringify(rows));
		})
	},
	getAll: function(req, res, next) {
		db.user.getAll(function(err, rows) {
			if (err) {
				// next(new Error('User already exits'));
				console.log('err', err)
			}
			console.log('getAll response: ', rows);
			res.end(JSON.stringify(rows));
		})
	}
}