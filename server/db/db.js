// var mysql = require('mysql');
// var config = require('../config.js');
//
// var db_config = {
// 	connectionLimit: 10,
// 	host: config.AWSRDSHost,
// 	port: 3306,
// 	user: config.AWSRDSUser,
// 	password: config.AWSRDSPassword,
// 	database: 'trail'
// }
//
// var pool = mysql.createPool(db_config);
// module.exports = pool;

var pg = require('pg');
var config = require('../config.js');

var config = {
  user: config.AWSRDSUser, //env var: PGUSER
  database: 'trail', //env var: PGDATABASE
  password: config.AWSRDSPassword, //env var: PGPASSWORD
  host: config.AWSRDSHost,
  port: 5432, //env var: PGPORT
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Client(config);
pool.connect();

// example query
var query = pool.query('SELECT * from posts');

query.on('row', function (row, result) {
  result.addRow(row);
});
query.on('end', function (result) {
  console.log(JSON.stringify(result.rows, null, '    '));
  pool.end();
});

module.exports = pool;
