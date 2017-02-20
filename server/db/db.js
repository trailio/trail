var mysql = require('mysql');

var db_config = {
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'trail'
}

var pool = mysql.createPool(db_config);

module.exports = pool;