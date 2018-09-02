// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5ac1ee9b4cd8cad3d1ba8f0d')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });
    db.collection('Users').find({name: 'Vedran'}).count().then((count) => {
        console.log(`User count: ${count}`);
        // console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch user', err)
    });

    client.close();
});