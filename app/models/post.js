var mongoose = require('mongoose')
  , Schema = mongoose.Schema

  var textSearch = require('mongoose-text-search');



var PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: '',
    },
    date:{
        type: Date, 
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
        default: '',
    },
    community: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Community'
    }],
    price: {
        type: String,
        required: true,
        default: '',
    },
    location: {
        type: String,
        required: true,
        default: '',
    },
    images: {
        type:[],
        required: false,
    },
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    accepted : {
        type: [],
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
});


PostSchema.plugin(textSearch);

PostSchema.index({ content: 'text' });

module.exports = mongoose.model('Post', PostSchema);

