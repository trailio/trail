var db = require('./db/helpers');
var Promise = require('bluebird');

module.exports = {
  post: function(payload, cb) {
    db.posts.post(payload, function(createdPost) {
      cb(createdPost);
    });
  }
};
