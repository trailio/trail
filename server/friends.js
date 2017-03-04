var db = require('./db/helpers');
var Promise = require('bluebird');

module.exports = {
  search: function(payload, cb) {
    db.friends.searchByString(payload.searchText, payload.userID, function(result) {
      cb(result);
    });
  }
};
