var express = require('express'),
	path = require('path');
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

// DB Connect String
//var connect = "postgres://username:password@localhost/database";
var connect = process.env.DATABASE_URL || 'postgres://postgres:$p3nc3r1byui@127.0.0.1:5432/postgres';

// Assign Dust Engine To .dust files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
	// PG Connect
	pg.connect(connect, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM public.recipes', function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			res.render('index', {recipes: result.rows});
			done();
		});
	});
	//res.render('index', {recipes: "result.rows"});
});

// Server
app.listen(5000, function(){
	console.log('Server started on port 5000');
});



/*

//const PORT = process.env.PORT || 5000
// load all env variables from .env file into process.env object
require('dotenv').config();
//process.env.SECRET

var express = require('express');
	path = require('path');
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

const http = require('http');

const PORT = process.env.PORT || 5000;
const { DATABASE_URL } = process.env;
const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
});

var connect = "postgres://username:password@localhost/database";
/*
const url = require('url');

//var db_url = url.parse(process.env.DATABASE_URL);

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true
});

app.get('/', function(req, res) {
	client.connect();
	client.query('SELECT * FROM public.recipes', function(err, result) {
		if (err) 
			return console.error('error running query', err);
		res.render('index', {recipes: result.rows});
		client.end();
	});
});
*/

/*



// Way to connect to db using node-postgres?
app.get('/', function(req, res){
	// PG Connect
	pg.connect(connect, function(err, client, done) {
		if (err)
			return console.error('error fetching client from pool', err);
		client.query('SELECT * FROM public.recipes', function(err, result) {
			if (err) 
				return console.error('error running query', err);
			res.render('index', {recipes: result.rows});
			done;
		});
	});
});


// Server
server.listen(PORT, () => {
	// eslint-disable-next-line
	console.log(`Server running on ${PORT}/`);
});


*/

// DB Connect String
//var connect = "postgres://postgres:pass@localhost:5433/project2";	
//var connect = "postgres://username:password@localhost/database";	
//$dbUrl = "postgres://postgres:pass@localhost:5433/project1";


/*

const { Client } = require('pg');

const PORT = process.env.PORT || 5000;
const { DATABASE_URL } = process.env;
const server = http.createServer((req, res) => {
	const client = new Client({
		connectionString: DATABASE_URL,
	});
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	client.connect()
		.then(() => client.query('SELECT * FROM public.recipes'))
		.then((result) => {
			res.end(`${result.rows[0].recipe_name}\n`);
			client.end();
		})
		.catch(() => {
			res.end('ERROR');
			client.end();
		});
});
*/


/*
// Possible way to connect to db with node.js
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
*/

/*
express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))

*/