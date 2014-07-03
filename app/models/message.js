var mongoose = require('mongoose')
  , Schema = mongoose.Schema



var MessageSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    date:{
        type: Date, 
        default: Date.now,
    },
    to: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    from: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    read: {
        type: Boolean,
        default: false,
    }
});



module.exports = mongoose.model('Message', MessageSchema);
