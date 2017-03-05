var db = require('./db/helpers');
var Promise = require('bluebird');

module.exports = {
  search: function(searchText, userID, cb) {
    db.friends.searchByString(searchText, userID, function(result) {
      cb(result);
    });
  }
};
