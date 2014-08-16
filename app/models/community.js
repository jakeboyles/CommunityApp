var mongoose = require('mongoose')
  , Schema = mongoose.Schema

  var textSearch = require('mongoose-text-search');



var CommunitySchema = new Schema({
    title: {
        type: String,
        required: true,
        default: '',
    },
    description:{
        type: String, 
        default: Date.now,
    },
    posts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }],
    zipcode: {
        type: Number,
        default: 00000,
    }
});




module.exports = mongoose.model('Community', CommunitySchema);

