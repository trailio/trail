var mysql = require('mysql');
var config = require('../config.js');

var db_config = {
	connectionLimit: 10,
	host: config.AWSRDSHost,
	port: 3306,
	user: config.AWSRDSUser,
	password: config.AWSRDSPassword,
	database: 'trail'
}

var pool = mysql.createPool(db_config);

module.exports = pool;
