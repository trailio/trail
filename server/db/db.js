var mysql = require('mysql');
var config = require('../config.js');

var db_config = {
	connectionLimit: 10,
	host: config.AWSRDSHost,
	port: 3306,
	user: config.AWSRDSUser,
	password: config.AWSRDSPassword,
	database: 'trail'
}

var pool = mysql.createPool(db_config);
// insert test data
// pool.query('truncate posts', function(){console.log("truncated posts")
// 	pool.query(`INSERT INTO posts (userID, longitude, latitude, imageURL, publicPost) VALUES (1, "-122.40743033333337", "37.78728814970013", "https://www.drupal.org/files/project-images/edit(27117).png", TRUE)`, function(){console.log("image1 sent")});
// 	pool.query(`INSERT INTO posts (userID, recipientUserID, longitude, latitude, imageURL, publicPost) VALUES (1, 2, "-122.40435033333334", "37.78541777072449", "http://www.clipartkid.com/images/43/2014-clipartpanda-com-about-terms-bhiktT-clipart.png", FALSE)`, function(){console.log("image2 sent")});
// 	pool.query(`INSERT INTO posts (userID, recipientUserID, longitude, latitude, imageURL, publicPost) VALUES (3, 1, "-122.40435033333334", "37.78541777072449", "http://clipart-library.com/data_images/187789.png", FALSE)`, function(){console.log("image3 FALSE")});
// 	pool.query(`INSERT INTO posts (userID, recipientUserID, longitude, latitude, imageURL, publicPost) VALUES (4, 1, "-122.40630366666669", "37.784332402346976", "http://www.i2symbol.com/images/abc-123/4/circled_digit_four_u2463_icon_256x256.png", FALSE)`, function(){console.log("image4 sent")});
// 	pool.query(`INSERT INTO posts (userID, recipientUserID, longitude, latitude, imageURL, publicPost) VALUES (5, 1, "-122.406417", "37.785834", "http://www.networksasia.net/files/five.jpg", FALSE)`, function(){console.log("image5 sent")});
// });
module.exports = pool;
