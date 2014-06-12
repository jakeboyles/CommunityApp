// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 80;			// set the port
var database = require('./config/database'); 			// load the database config
var passport = require('passport');
var flash 	 = require('connect-flash');

// configuration ===============================================================


mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/testMongo';



mongoose.connect(mongoUri); 	// connect to mongoDB database on modulus.io

require('./config/passport')(passport); // pass passport for configuration



// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


 

app.configure(function() {
	// app.use(allowCrossDomain);
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 	
	app.use(express.multipart());					// simulate DELETE and PUT
	// required for passport
	app.use( express.cookieParser() );
	app.use(express.session({ secret: 'communitybasedapp' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
});

// routes ======================================================================
require('./app/routes.js')(app,passport);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
