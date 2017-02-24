var port = process.env.PORT || 8000;
var server = require('./index');

server.listen(port, function() {
	console.log('Server is listening on ' + port);
});