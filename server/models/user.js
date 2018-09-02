var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = { User };


// var newUser = new User({
//     email:'vepe@saxobank.com'
// });

// newUser.save().then((doc) => {
//     console.log('Registered new user', doc)
// }, (e) => {
//     console.log('Unable to create user', doc)
// });