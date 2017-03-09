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
      var values = [postDetails.userID, postDetails.recipientUserID, postDetails.longitude, postDetails.latitude, postDetails.imageURL, postDetails.publicPost];
      // user specified no user recipients and post is public
      if (values[1].length === 0 && values[5] === true) {
        var noUserRecipients = values.slice();
        noUserRecipients.splice(1, 1);
        db.one('INSERT INTO posts(userID, longitude, latitude, imageURL, publicPost) VALUES($1, $2, $3, $4, $5) returning id', noUserRecipients)
          .then(function(result) {
            cb(null);
          })
          .catch(function(error) {
            console.log('posts.post ERROR: ', error);
          });
      } else {
        db.one('INSERT INTO posts(userID, recipientUserID, longitude, latitude, imageURL, publicPost) VALUES($1, $2, $3, $4, $5, $6) returning *', values)
          .then(function(post) {
            db.query('SELECT username as recipientUsername FROM profile WHERE id = $1', post.recipientuserid)
              .then(function(result) {
                if (result.length === 1) {
                  console.log('posts.post helper: checking checking 123 for result[0].recipientUsername', result[0].recipientusername);
                  post.recipientusername = result[0].recipientusername;
                  cb(post);
                } else {
                  console.log(`posts.post username ERROR: username search returned ${result.length} results`);
                }
              })
              .catch(function(error2) {
                console.log('posts.post username get ERROR: ', error2);
              });
          })
          .catch(function(error) {
            console.log('posts.post ERROR: ', error);
          });
      }
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
    },
    getPublicPosts: function(cb) {
      db.query('SELECT p.userID as userID, u.username as username, p.longitude as longitude, p.latitude as latitude, p.imageURL as imageURL, p.publicPost as publicPost, p.timePosted as timePosted, p.timeExpired as timeExpired FROM posts p JOIN profile u on p.userID = u.id WHERE publicpost = true')
      .then(function(result) {
        cb(result);
      })
      .catch(function(error) {
        console.log('posts.getPublicPosts ERROR: ', error);
      });
    }
  },
  friends: {
    get: function(primaryID, cb) {
      db.query('SELECT f.friendID as friendID, p.username as username, f.friendshipConfirmed as friendshipConfirmed, f.primaryIDSentRequest as primaryIDSentRequest, f.primaryIDReceivedRequest as primaryIDReceivedRequest FROM friend f JOIN profile p on f.friendID =  p.id WHERE f.primaryID = $1', primaryID)
      .then(function(result) {
        cb(result);
      })
      .catch(function(error) {
        console.log('friends.get ERROR: ', error);
      });
    },
    searchByString: function(string, userID, cb) {
      db.manyOrNone('SELECT id, username FROM profile WHERE lower(username) LIKE "%$1#%" AND id != $2', [string, userID])
        .then(function(result) {
          cb(result);
        })
        .catch(function(error) {
          console.log('friends.searchByString ERROR: ', error);
        });
    },
    exist: function(primaryID, friendID, cb) {
      db.query('SELECT * FROM friend WHERE primaryID = $1 AND friendID = $2', [primaryID, friendID])
        .then(function(result) {
          cb(result);
        })
        .catch(function(error) {
          console.log('friends.exist ERROR: ', error);
        });
    },
    insert: function(primaryID, friendID, cb) {
      db.one('INSERT INTO friend(primaryID, friendID, friendshipConfirmed, primaryIDSentRequest, primaryIDReceivedRequest) VALUES($1, $2, $3, $4, $5) returning friendID', [primaryID, friendID, false, true, false])
        .then(function(confirmed) {
          db.one('INSERT INTO friend(primaryID, friendID, friendshipConfirmed, primaryIDSentRequest, primaryIDReceivedRequest) VALUES($1, $2, $3, $4, $5) returning friendID', [friendID, primaryID, false, false, true])
          .then(function(confirmed2) {
            cb(confirmed2);
          })
          .catch(function(error2) {
            console.log('friends.insert ERROR: ', error2);
          });
        })
      .catch(function(error) {
        console.log('friends.insert ERROR: ', error);
      });
    },
    update: function(primaryID, friendID, cb) {
      db.one('UPDATE friend SET (friendshipConfirmed, primaryIDSentRequest, primaryIDReceivedRequest) = (TRUE, FALSE, FALSE) WHERE primaryID = $1 AND friendID = $2 returning friendID', [primaryID, friendID])
      .then(function(confirmed) {
        db.one('UPDATE friend SET (friendshipConfirmed, primaryIDSentRequest, primaryIDReceivedRequest) = (TRUE, FALSE, FALSE) WHERE primaryID = $1 AND friendID = $2 returning friendID', [friendID, primaryID])
          .then(function(confirmed2) {
            cb();
          })
          .catch(function(error2) {
            console.log('friends.update ERROR: ', error2);
          });
      })
      .catch(function(error) {
        console.log('friends.update ERROR: ', error);
      });
    },
    remove: function(primaryID, friendID, cb) {
      db.one('DELETE FROM friend WHERE primaryID = $1 AND friendID = $2 returning friendID', [primaryID, friendID])
      .then(function(confirmed) {
        db.one('DELETE FROM friend WHERE primaryID = $1 AND friendID = $2 returning friendID', [friendID, primaryID])
          .then(function(confirmed2) {
            cb(confirmed2);
          })
          .catch(function(error2) {
            console.log('friends.remove ERROR: ', error2);
          });
      })
      .catch(function(error) {
        console.log('friends.remove ERROR: ', error);
      });
    }
  }
};
