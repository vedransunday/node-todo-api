const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5b82a35614b6cc45a3b5a3a71';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// });

id = '5b4f8b752c848b4b67a0e9be';

User.findById(id).then((user) => {
        if (!user) {
            return console.log('User not found');
        }
        console.log('User by Id', user);
    }).catch((e) => console.log(e));


// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));