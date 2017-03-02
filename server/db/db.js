var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var config = require('../config.js');

var dbConfig = {
  user: config.AWSRDSUser, //env var: PGUSER
  password: config.AWSRDSPassword, //env var: PGPASSWORD
  host: config.AWSRDSHost,
  database: 'trail', //env var: PGDATABASE
  port: 5432, //env var: PGPORT
  max: 10,
  idleTimeoutMillis: 30000
};

var db = pgp(dbConfig);

db.any('SELECT * FROM profile WHERE username=$1', 'test')
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.log('user.get ERROR: ', error);
        });

// values = ['Andrewregal', 'password', 'andrew.regal@gmail.com', [5, 3]];
// db.query('insert into profile(username, password, email, friends) values ($1, $2, $3, $4)', values)
  // .then(function(result) {
  //   console.log('worked: ', result);
  // })
  // .catch(function(error) {
  //   console.log('ERROR: ', error);
  // });

// db.manyOrNone("SELECT id, username FROM profile WHERE username LIKE '%$1#%'", 'est')
//   .then(function(result) {
//     console.log('worked: ', result[1].username);
//   })
//   .catch(function(error) {
//     console.log('ERROR: ', error);
//   });

module.exports = db;
