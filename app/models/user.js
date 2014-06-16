
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var validate = require('mongoose-validate');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,       
        password     : String,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, required: true },
    profilepicture: { type: String },
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

