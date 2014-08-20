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



exports.acceptOffer = function(req,res) {
    Comment.find({_id : req.body.comment}).populate('user').exec(function(err,comment){
        if (err) {
            res.send(err);
        }

        Post.findById(req.body.user).populate('user').exec(function(err,post){
              if (err) {
                res.json(err);
              }
              post.accepted = comment;
              post.save(function(){
              offerAccepted(comment,post);
              res.json(post);
              });
        })

    });
}


exports.get = function(req,res) {
    Comment.find({ postid : req.body.postid,}).populate('user').exec(function(err,comment){
        if (err)
            res.send(err);

        res.json(comment);
    });
}



exports.create = function(req,res) {
    Comment.create({ 
        title : req.body.title,
        content : req.body.content,
        postid : req.body.postid,
        offer: req.body.offer,
        user: req.user,
        post: req.body.postid,
    },function(err, comment) {
        Post.update({_id: req.body.postid},{$push: {comments:comment}},{upsert:true},function(err,post){
            if(err){
             res.send(err);
            }else{
            res.send(comment);
        }
        });
    });
}




var offerAccepted = function(comment,post) {
    var message = {
        "html": "<h2>Offer Accepted!</h2><p>Congrats "+comment[0].user.firstName+" your offer of $"+comment[0].offer+" was accepted!<p>Please contact "+post.user.firstName+" "+post.user.lastName+" to set up a time to meet. You can email them at: "+post.user.local.email,
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
