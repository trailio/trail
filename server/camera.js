var db = require('./db/helpers');
var Promise = require('bluebird');

module.exports = {
  post: function({longitude, latitude, imageURL, publicPost}, cb) {
    db.posts.post(longitude, latitude, imageURL, publicPost, function(err, rows) {
      if (err) {
        console.log('Failed to connect to database');
      } else {
        console.log('Photo Posted');
        console.log('*** ROWS ***', rows);
        cb(rows);
      }
    });
  }
};
