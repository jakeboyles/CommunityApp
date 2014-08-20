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


exports.single = function(req, res){
    Post.find({
        _id : req.params.post_id,
        //user:req.user
    }).populate('user comments community').exec(function(err,docs){
        if (err)
            res.send(err);
            var allComments = [];
            async.forEach(docs,function(doc,callback) {
              Comment.populate( doc.comments,{ "path": "user" },function(err,output) {
                allComments.push(output);
                callback(res.send({"post":docs,"comments":allComments}));
              });

            },function(err) {
              console.log( "all: " + JSON.stringify(docs,undefined,4 ));
            });
    });
}



exports.create = function(req,res){
    Post.create({
        title : req.body.title,
        content : req.body.content,
        price : req.body.price,
        location:req.body.location,
        community:req.body.community,
        user: req.user,
        images:req.body.images,
    }, function(err, post) {
        if (err)
            res.send(err);
        // get and return all the todos after you create another
        Post.find(function(err, posts) {
            if (err)
                res.send(err)

            Community.update({_id:req.body.community},{$push: {posts:post}},{upsert:true},function(err,post){
                if(err){
                 res.send(err);
                }else{
                res.send(posts);
            }
            });
        });
    });
}



exports.getAll = function(req,res){
    var communityID = req.body.com;
    Post.find({community : communityID}).populate('comments').exec(function(err, posts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            posts.reverse();

            Community.find({_id:communityID}).exec(function(err,community){
                res.jsonp({"posts":posts,"Community":community});
            })
        }
    });
}
