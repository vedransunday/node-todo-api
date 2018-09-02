const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Water plants'}).then((result, err) => {
    //     if (err) {
    //         return console.log('Unable to delete todo', err)
    //     }
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Walk the beautiful dog'}).then((result, err) => {
    //     if (err) {
    //         return console.log('Unable to delete todo', err)
    //     }
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // deleteMany
    db.collection('Users').deleteMany({
        name: 'Vedran'
    })

    client.close();
});