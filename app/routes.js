var Post = require('./models/post');
var User = require('./models/user');
var Comment = require('./models/comment');



module.exports = function(app,passport) {

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
    res.send(req.user);
  });


  app.post('/login', passport.authenticate('local-login'),function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user);
  });

    app.get('/login',function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    if(isLoggedIn(req,res)) {
    	res.send(req.user);
    }
    else {
    	res.send("Nope");
    }
  });


	// create todo and send back all todos after creation
	app.post('/api/posts', function(req, res) {

	if(isLoggedIn(req,res)) {

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

	} else {
		res.jsonp("0");
	}


	});


	app.post('/api/comment', function(req, res) {

	 if(req.user != null) {
		Comment.create({ 
			title : req.body.title,
			content : req.body.content,
			postid : req.body.postid,
			user: req.user,
		},function(err, comment) {
			res.send(comment);
		});
	} else {
		res.json({ redirect: "/signin" });
	}
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
	app.delete('/api/posts/:post_id', function(req, res) {

		if(isLoggedIn(req,res)) {

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
		}

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


	// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return true;

	// if they aren't redirect them to the home page
	res.json("0")
}


	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};