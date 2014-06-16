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
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: {
        type: Schema.ObjectId,
        ref: 'Post'
    },
    offer: {
        type: String,
        default: '',
    }
});


CommentSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user').exec(cb);
};



module.exports = mongoose.model('Comment', CommentSchema);
