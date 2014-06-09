var mongoose = require('mongoose')
  , Schema = mongoose.Schema



var CommentSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    postid: {
        type: String,
        default: '',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    offer: {
        type: String,
        default: '',
    }
});




module.exports = mongoose.model('Comment', CommentSchema);

