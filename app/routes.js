var Post = require('./models/post');
var User = require('./models/user');
var Comment = require('./models/comment');
var Community = require('./models/community');
var Message = require('./models/message');
var _ = require('underscore');
var fs = require ('fs.extra');
var gm = require('gm');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('OGc0mZWdpPE41igHW215UQ');
var async = require('async'); 
var s3 = require('s3');


var client = s3.createClient({
  maxAsyncS3: Infinity,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  s3Options: {
    accessKeyId: "AKIAJ7YYYNC3VQP2KJ6Q",
    secretAccessKey: "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",
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});


module.exports = function(app,passport) {


	/* require your controllers here */
var posts = require('./controllers/posts');
var user = require('./controllers/user');
var community = require('./controllers/community');
var message = require('./controllers/message');
var comment = require('./controllers/comment');


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.get('/api/posts/:post_id', posts.single);

app.post('/api/posts',isLoggedIn, posts.create);

app.post('/api/posts/page',posts.getAll)

app.get('/api/profile/:post_id',user.single);

app.post('/api/editProfile',isLoggedIn,user.edit);

app.post('/api/communities',community.findByZip);

app.post('/api/communities/add',community.add);

app.post('/api/message',message.create);

app.get('/api/message',message.get);

app.put('/api/message',isLoggedIn,message.updateRead);

app.delete('/api/message/:data',isLoggedIn,message.delete);

app.post('/api/acceptOffer',isLoggedIn,comment.acceptOffer);

app.post('/api/allComments',comment.get);

app.post('/api/comment',isLoggedIn,comment.create);

app.post('/api/signup',passport.authenticate('local-signup'),user.signup);

app.get('/logout',user.logout);

app.post('/login',passport.authenticate('local-login'),user.login);

app.get('/login',isLoggedIn,user.getLogin);





app.post('/api/search',function(req,res) {
	var query = req.body.query;
	Post.textSearch(query, function (err, output) {
    if (err) res.json(err);

    res.json(output);
	});
});





app.post('/post/image',function(req,res) {
    var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var time = new Date().getTime();
    var target_path = './public/uploads/' +time+ req.files.file.name;
    var imageName = req.files.file.name

    fs.readFile(req.files.file.path, function (err, data) {

		var imageName = req.files.file.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		  var newPath = "./public/uploads/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {
		  	console.log(err);
		  	/// let's see it
		  	res.json('/uploads/'+imageName);

		  });
		}

	
	});
});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.json({error:"Please Log In"})
}



app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

};