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


exports.create = function(req,res) {
    Community.create({
            title : req.body.title,
            description : req.body.content,
            zipcode : req.body.zip,
        }, function(err, message) {

            if (err) {
            res.send(err);
            }

            res.send(message);
    });
}


exports.findByZip = function(req,res){
 var relatedPosts = [];
    if(req.body.id) {
        Community.find({zipcode:req.body.id}).populate('posts').exec(function(err, community) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                for(i=0;i<community.length;i++){
                    relatedPosts.push(community[i].posts);
                }
                res.jsonp({"community":community,"posts":relatedPosts});
            }
        });
    } else {
        Community.find().exec(function(err, posts) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                posts.reverse();
                res.jsonp(posts);
            }
        });
    }
}


exports.add = function(req,res){
console.log(req.body);
 Community.create({
            title : req.body.title,
            description : req.body.content,
            zipcode : req.body.zip,
        }, function(err, message) {

            if (err) {
            res.send(err);
            }

            res.send(message);
    });
}

