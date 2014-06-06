var Post = require('./models/post');
var User = require('./models/user');
var Comment = require('./models/comment');

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('OGc0mZWdpPE41igHW215UQ');





module.exports = function(app,passport) {

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/posts', function(req, res) {

	Post.find().populate('user').exec(function(err, posts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(posts);
        }
    });

	});


 app.post('/signup', passport.authenticate('local-signup'),function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
   	sendMessage(req.user);

    res.send(req.user);
  });


  app.post('/login', passport.authenticate('local-login'),function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user);
  });

  app.get('/login', isLoggedIn, function(req, res){
		res.json(req.user);
  });


	// create todo and send back all todos after creation
	app.post('/api/posts',isLoggedIn, function(req, res) {


		Post.create({
			title : req.body.title,
			content : req.body.content,
			price : req.body.price,
			user: req.user,
		}, function(err, post) {
			if (err)
				res.send(err);

			Post.find()

			// get and return all the todos after you create another
			Post.find(function(err, posts) {
				if (err)
					res.send(err)
				res.jsonp(posts);
			});
		});




	});


	app.post('/api/comment', isLoggedIn, function(req, res) {

		Comment.create({ 
			title : req.body.title,
			content : req.body.content,
			postid : req.body.postid,
			user: req.user,
		},function(err, comment) {
			res.send(comment);
		});
	});


	app.post('/api/allComments', function(req, res) {

		Comment.find({
				postid : req.body.postid,
			}).populate('user').exec(function(err,comment){
				if (err)
					res.send(err);

				res.json(comment);
			});

	});


	// delete a post
	app.delete('/api/posts/:post_id',isLoggedIn, function(req, res) {


			Post.remove({
				_id : req.params.post_id,
				//user:req.user
			}, function(err, post) {
				if (err)
					res.send(err);

				// get and return all the todos after you create another
				Post.find(function(err, posts) {
					if (err)
						res.send(err)
					res.json(posts);
				});
			});

	});


	app.get('/api/posts/:post_id', function(req, res) {
			Post.find({
				_id : req.params.post_id,
				//user:req.user
			}).populate('user').exec(function(err,post){
				if (err)
					res.send(err);

				res.json(post);
			});
	});



var sendMessage = function(user) {
	var message = {
	    "html": "<h2>Thanks for registering!</h2><p>Your username is "+user.local.email+"</p>",
	    "text": "Thanks for registering Your username is "+user.local.email,
	    "subject": "Thanks for Registering!",
	    "from_email": "jake@jibdesigns.com",
	    "from_name": "Jake Boyles",
	    "to": [{
	            "email": user.local.email,
	            "name": "Jake Boyles",
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": "jake@jibdesigns.com"
	    },
	    "important": false,
	    "track_opens": null,
	    "track_clicks": null,
	};
	var async = false;
	mandrill_client.messages.send({"message": message, "async": async}, function(result) {
		    console.log(result);

	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.json({error:"Please Log In"})
}



	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};