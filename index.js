const express = require('express');
const path = require('path');
//const PORT = process.env.PORT || 5000
var pg = require('pg');
var app = express();

app.get('/db', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM test_table', function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.send("Error " + err);
			}
			else {
				res.render('pages/db', {results: result.rows} );
			}
		});
	});
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index')
});

app.listen(app.get('port'), function() {
	console.log('Listening on port ', app.get('port'));
});

/*
express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))

*/