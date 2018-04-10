const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const util = require('util');
const url = require('url');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
//const pg = require('pg');
const { Client } = require('pg');
var session = require('express-session');
var User = require('./modules/user');

var app = express();

var db_url = url.parse(process.env.DATABASE_URL || 'postgres://postgres:$p3nc3r1byui@127.0.0.1:5432/postgres');


var scheme = db_url.protocol.substr(0, db_url.protocol.length - 1);
var user = db_url.auth.substr(0, db_url.auth.indexOf(':'));
var pass = db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length);
var host = db_url.host.substr(0, db_url.host.indexOf(':'));
var pgport = db_url.host.substr(db_url.host.indexOf(':') + 1, db_url.host.length);
var db = db_url.path.substr(db_url.path.indexOf('/') + 1, db_url.path.length);

// Connect to the PostgreSQL server
const client = new Client({
	host: host,
	user: user,
	database, db,
	password, pass
});

client.connect();

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// set our application port
// app.set('nodeport', process.env.PORT || 5000);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
	key: 'user_sid',
	secret: 'imdkaf8dck)6e#ylzr3vsvi^_6xlmig@d@7pmy5tn@coqt(l&k',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000
	}
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, 
// then automatically log the user out. This usually happens when you stop your express server 
// after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
	if (req.cookies.user_sid && !req.session.user) {
		res.clearCookie('user_sid');
	}
	next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
		res.redirect('/');
	} else {
		next();
	}
};


//const Pool = require('pg-pool');
//const url = require('url');

// DB Connect String
//var connect = process.env.DATABASE_URL || 'postgres://postgres:$p3nc3r1byui@127.0.0.1:5432/postgres';

// Assign Dust Engine To .dust files
app.engine('dust', cons.dust);







// Server
app.listen(5000, function(){
	console.log('Server started on port 5000');
});


// ACCESS to SQL DATABASE????
/*
app.get('/', function(req, res){
	// PG Connect
	//pool.connect(connect, function(err, client, done) {
	pg.connect(connect, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM recipes', function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			res.render('index', {recipes: result.rows});
			done();
		});
	});
	//pool.end();
	//res.render('index', {recipes: "result.rows"});
});

app.post('/add', function(req, res){
	// PG Connect		
	pg.connect(connect, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)", [req.body.name, req.body.ingredients, req.body.directions]);

		done();
		res.redirect('/');
	});
	//res.redirect('/');
});

app.delete('/delete/:id', function(req, res) {
	// PG Connect	
	pg.connect(connect, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("DELETE FROM recipes WHERE id = $1",[req.params.id]);

		done();
		res.redirect(200);
	});
	//res.redirect(200);
});

app.post('/edit', function(req, res){
	// PG Connect	
	pg.connect(connect, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("UPDATE recipes SET name=$1, ingedients=$2, directions=$3 WHERE id = $4", [req.body.name, req.body.ingredients, req.body.directions, req.body.id]);

		done();
		res.redirect('/');
	});
	//res.redirect('/');
});

*/



// OLD GARBAGE



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