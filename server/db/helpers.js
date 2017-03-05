var db = require('./db');


module.exports = {
  user: {
    get: function (username, cb) {
      db.any('SELECT * FROM profile WHERE username=$1', username)
        .then(function(result) {
          cb(result);
        })
				.catch(function(error) {
          console.log('user.get ERROR: ', error);
        });
    },
    signup: function(loginDetails, cb) {
      var values = [loginDetails.username, loginDetails.password, loginDetails.email];
      db.one('INSERT INTO profile(username, password, email) VALUES($1, $2, $3) returning id', values)
        .then(function(result) {
          cb(result);
        })
				.catch(function(error) {
          console.log('user.signup ERROR: ', error);
				});
    },
    getIDUsername: function(IDList, cb) {
      db.query(`SELECT username, id FROM profile WHERE id in (${IDList.join()})`)
        .then(function(result) {
          cb(result);
        })
        .catch(function(error) {
          console.log('user.getIDUsername ERROR: ', error);
        });
    }
  },
  posts: {
    post: function(postDetails, cb) {
      var values = [postDetails.recipientUserID, postDetails.longitude, postDetails.latitude, postDetails.imageURL, postDetails.publicPost];
      db.one('INSERT INTO posts(recipientUserID, longitude, latitude, imageURL, publicPost) VALUES($1, $2, $3, $4, $5) returning id', values)
        .then(function(result) {
          cb(result);
        })
        .catch(function(error) {
          console.log('posts.post ERROR: ', error);
        });
    },
    getSentPosts: function(userID, cb) {
      db.query('SELECT p.recipientUserID as recipientUserID, u.username as recipientUsername, p.longitude as longitude, p.latitude as latitude, p.imageURL as imageURL, p.publicPost as publicPost, p.timePosted as timePosted, p.timeExpired as timeExpired FROM posts p JOIN profile u on u.id = ANY(p.recipientUserID) WHERE p.userID = $1', userID)
        .then(function(result) {
          cb(result);
        })
        .catch(function(error) {
          console.log('posts.getSentPosts ERROR: ', error);
        });
    },
    getReceivedPosts: function(userID, cb) {
      db.query('SELECT p.userID as userID, u.username as username, p.longitude as longitude, p.latitude as latitude, p.imageURL as imageURL, p.publicPost as publicPost, p.timePosted as timePosted, p.timeExpired as timeExpired FROM posts p JOIN profile u on p.userID = u.id WHERE p.recipientUserID @> ARRAY[$1]', userID)
      .then(function(result) {
        cb(result);
      })
      .catch(function(error) {
        console.log('posts.getReceivedPosts ERROR: ', error);
      });
    }
  },
  friends: {
    searchByString: function(string, userID, cb) {
      db.manyOrNone("SELECT id, username FROM profile WHERE lower(username) LIKE '%$1#%' AND id != $2", [string, userID]  )
        .then(function(result) {
          cb(result)
        })
        .catch(function(error) {
          console.log('friends.searchByString ERROR: ', error);
        });
    }
  }
};
