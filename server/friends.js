var db = require('./db/helpers');
var Promise = require('bluebird');

module.exports = {
  search: function(searchText, userID, cb) {
    db.friends.searchByString(searchText, userID, function(result) {
      cb(result);
    });
  },
  add: function(primaryID, friendID, cb) {
    db.friends.exist(primaryID, friendID, function(exists) {
      console.log('friend.js add function -> exists => ', exists);
      //is it possible that the result is err, result instead of just result as parameter? probably not in postgres
      if (exists.length === 0) {
        //if friends.exist returns no result, it means no friend has formed, so we need to insert new friend records
        db.friends.insert(primaryID, friendID, function(requestSentConfirmation) { /*write this function*/
          console.log('friend.js -> friend request sent confirmation ->', requestSentConfirmation);
          cb('REQUEST SENT'); //true represents the friend request is awaiting confirmation
        });
      } else if (exists[0].primaryidreceivedrequest === true) { /* test if it actually returns a boolean or a string'TRUE'*/
        //else if friends.exist && primaryID is friend request recipient , then we need to confirm the friendship
        db.friends.update(primaryID, friendID, function(friendshipEstablishedConfirmation) {
          console.log('friend.js -> friendship established ->', friendshipEstablishedConfirmation);
          cb('FRIENDSHIP CONFIRMED'); //false represents the friendship has been established
        });
      } else {
        //else if friends.exist && primaryID is friend request sender, we take no action
        console.log('friend.js -> friend request already sent');
        cb('NO ACTION'); //true represents the friend request is awaiting confirmation
      }
    });
  },
  remove: function(primaryID, friendID, cb) {
    db.friends.exist(primaryID, friendID, function(exists) {
      console.log("friend.js remove function -> exists => ", exists);
      if (exists.length === 0) {
        //if friends.exist returns no results, it means no friend connection is formed
        cb(false);
      } else {
        db.friends.remove(primaryID, friendID, function(friendshipDeletedConfirmation){
          console.log('friend.js -> friendship deleted -> ', friendshipDeletedConfirmation);
          cb(true);
        });
      }
    });
  }
};
