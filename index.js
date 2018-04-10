const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000

var pg = require('pg');

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

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))

