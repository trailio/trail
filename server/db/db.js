var mysql = require('mysql');

var db_config = {
	// connectionLimit: 10,
	host: 'localhost',
	port: 5000,
	user: 'root',
	password: '',
	database: 'trail'
}

// var pool = mysql.createPool(db_config);
var pool = mysql.createConnection(db_config);
pool.query("SELECT * FROM testing", function(err, rows){console.log('test query', err, rows)})

module.exports = pool;