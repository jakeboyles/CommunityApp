var mongoose = require('mongoose')
  , Schema = mongoose.Schema



var PostSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    community: {
        type: String,
        default: '',
    },
    price: {
        type: String,
        default: '',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});




module.exports = mongoose.model('Post', PostSchema);

