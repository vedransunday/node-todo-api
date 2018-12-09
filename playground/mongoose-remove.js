const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({}).then((result) => {
//     console.log(result)
// });

Todo.findByIdAndRemove('5c0425deef67a11f7d8fa54b').then((todo) => {
    console.log(todo);
})