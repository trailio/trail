var db = require('./db/helpers');
var Promise = require('bluebird');

module.exports = {
  search: function(payload, cb) {
    db.friends.searchByString(payload, function(result) {
      cb(result);
    });
  }
};
