var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);

var dbConfig = {
  user: process.env.AWSRDSUser, //env var: PGUSER
  password: process.env.AWSRDSPassword, //env var: PGPASSWORD
  host: process.env.AWSRDSHost,
  database: 'trail', //env var: PGDATABASE
  port: 5432, //env var: PGPORT
  max: 10,
  idleTimeoutMillis: 30000
};

var db = pgp(dbConfig);

module.exports = db;
// var val = [1, [2, 3], 'longitude', 'latitude', 'http://kingofwallpapers.com/random-image/random-image-005.jpg', true];
// db.one('INSERT INTO posts(userID, recipientUserID, longitude, latitude, imageURL, publicPost) VALUES($1, $2, $3, $4, $5, $6) returning *', val)
//   .then(function(result) {
//     console.log('TESTESTEST', result.recipientuserid)
//   })
//   .catch(function(error) {
//     console.log('TESTTEST ERROR: ', error);
//   });

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


// var sendArray = [5, 8, 9];
// var values = [3, sendArray, '-122.40743033333337', '37.98728814970013', 'https://s3-us-west-1.amazonaws.com/trail-media/videos/undefined20170304T030525921Z.mp4', true];
//
// db.one('INSERT INTO posts(userid, recipientuserid, longitude, latitude, imageURL, publicPost) VALUES($1, $2, $3, $4, $5, $6) returning id', values)
//   .then(function(result) {
//     console.log(result);
//   })
//   .catch(function(error) {
//     console.log('posts.post ERROR: ', error);
//   });
