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

var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var config = require('../config.js');

var db_config = {
  user: config.AWSRDSUser, //env var: PGUSER
  password: config.AWSRDSPassword, //env var: PGPASSWORD
  host: config.AWSRDSHost,
  database: 'trail', //env var: PGDATABASE
  port: 5432, //env var: PGPORT
  max: 10,
  idleTimeoutMillis: 30000
};

var db = pgp(db_config);

db.any('select * from posts')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });

module.exports = db;
