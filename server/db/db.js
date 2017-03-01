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

module.exports = db;
