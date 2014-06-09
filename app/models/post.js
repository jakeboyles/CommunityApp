var mongoose = require('mongoose')
  , Schema = mongoose.Schema



var PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: '',
    },
    content: {
        type: String,
        required: true,
        default: '',
    },
    community: {
        type: String,
        default: '',
    },
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
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    accepted : {
        type: [],
    }
});




module.exports = mongoose.model('Post', PostSchema);

