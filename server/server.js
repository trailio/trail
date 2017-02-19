var port = process.env.PORT || 8000;
var app = require('./index');

app.listen(port, function() {
	console.log('Server is listening on ' + port);
});