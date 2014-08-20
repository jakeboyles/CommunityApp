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
    Message.create({
            title : req.body.title,
            content : req.body.content,
            to : req.body.to,
            from : req.body.from,
        }, function(err, message) {

            if (err) {
            res.send(err);
            }

            Message.find({
                _id : message._id,
            }).populate('from to').exec(function(err,message){
                if (err)
                    res.send(err);

                sentMessageEmail(message[0].from,message[0].to,message[0]);
                res.send(message)
            });
    });
}


exports.get = function(req,res) {

     var messagesAll = {
        all:"",
        unread:"",
     };

    Message.find({
        to : req.user._id,
        }).populate('from').exec(function(err,messages){
            if (err)
                res.send(err);
            messagesAll.all = messages;

            Message.find({
                to : req.user._id,
                read: false,
            }).populate('from').exec(function(err,messages){
            if (err)
                res.send(err);

            messagesAll.unread = messages;
            res.json(messagesAll);
    });
    });
}


exports.updateRead = function(req,res){
    Message.findById(req.body._id).
    exec(function(err,message){
        if (err) {
            res.json(err);
        }
        message.read = true;
        message.save(function(){
        res.json(message);
        });
    })
}



exports.delete = function(req,res){
    Message.remove({
        _id: req.params.data,
    }, function(err,message) {
        if(err) {
            res.json(err);
        }

        res.json(message);
    });
}



var sentMessageEmail = function(from,to,message) {
    var message = {
        "html": "<h2>New Message</h2><p>You have received a new message from "+from.firstName+"</p><br><br><h4>"+message.title+"</h4><p>"+message.content+"</p>",
        "text": "You have received a new message from "+from.firstName,
        "subject": "Received New Message",
        "from_email": "jake@jibdesigns.com",
        "from_name": "Jake Boyles",
        "to": [{
                "email": to.local.email,
                "name": to.firstName+" "+to.lastName,
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