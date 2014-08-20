var Post = require('.././models/post');
var User = require('.././models/user');
var Comment = require('.././models/comment');
var Community = require('.././models/community');
var Message = require('.././models/message');
var _ = require('underscore');
var fs = require ('fs.extra');
var gm = require('gm');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('OGc0mZWdpPE41igHW215UQ');
var async = require('async'); 
var s3 = require('s3');



exports.single = function(req,res){
    User.find({
        _id : req.params.post_id,
        //user:req.user
    }).exec(function(err,user){
        if (err)
            res.send(err);

        Post.find({
            user : req.params.post_id,
            //user:req.user
        }).exec(function(err,post){
            if (err)
                res.send(err);

            Comment.find({
                user : req.params.post_id,
            }).populate('post').exec(function(err,comments){
            if (err)
            res.send(err);
            res.json({"posts":post,"user":user,"comments":comments})
            });
        });

    });
}

exports.edit = function(req,res){
    User.findOne({ _id: req.user._id }, function (err, doc){
        if(err) {
            res.json(err);
        }
      doc.firstName = req.body.firstName;
      doc.lastName = req.body.lastName;
      doc.local.email = req.body.local.email;
      doc.location = req.body.location;
      doc.profilepicture = req.body.profilepicture;
      doc.phone = req.body.phone;
      doc.save();
      res.json(doc);
    });
}


exports.signup = function(req,res) {
    res.send(req.user);
    sendMessage(req.user);
}

exports.logout = function(req,res){
    req.logout();
    res.redirect('/');
}

exports.login = function(req,res) {
    res.send(req.user);
}

exports.getLogin = function(req,res){
    res.json(req.user);
}



// Send registering email.

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
