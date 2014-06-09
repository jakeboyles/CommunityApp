var Post = require('./models/post');
var User = require('./models/user');
var Comment = require('./models/comment');
var fs = require("fs");
var gm = require('gm');
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



app.post('/post/image',function(req,res) {
	console.log(req.files.file.path);
    var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var time = new Date().getTime();
    var target_path = './public/uploads/' +time+ req.files.file.name;

    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) {
        	res.send(err);
        }
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.json("uploads/"+time+req.files.file.name);
        });
    });
});


 app.post('/signup', passport.authenticate('local-signup'),function(req, res) {
        res.send(req.user);
    	sendMessage(req.user);
  });


  app.get('/logout',function(req, res) {
   		req.logout();
  		res.redirect('/');
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
			location:req.body.location,
			user: req.user,
			images:req.body.images,
		}, function(err, post) {
			if (err)
				res.send(err);
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
			offer: req.body.offer,
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


	app.post('/api/acceptOffer',function(req,res){


		Comment.find({
				_id : req.body.comment,
			}).populate('user').exec(function(err,comment){
				if (err)
					res.send(err);


				Post.findById(req.body.user, function (err, post) {
				  if (err) {
				  	res.json(err);
				  }
				  post.accepted = comment;
				  post.save(function(){
				  offerAccepted(comment);
				  res.json(comment);
				  });
				})

			});



	});


	// delete a post
	app.delete('/api/posts/:post_id',isLoggedIn, function(req, res) {


			Post.remove({
				_id : req.params.post_id,
				user:req.user
			}, function(err, post) {
				if (!post)
					res.json({error:"You cant delete this"});

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

var offerAccepted = function(comment) {
	var message = {
	    "html": "<h2>Offer Accpeted!</h2><p>Congrats "+comment[0].user.firstName+" your offer of "+comment[0].offer+" was accepted!",
	    "subject": "Offer Accepted!",
	    "from_email": "jake@jibdesigns.com",
	    "from_name": "Jake Boyles",
	    "to": [{
	            "email": comment[0].user.local.email,
	            "name": comment[0].user.firstName,
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