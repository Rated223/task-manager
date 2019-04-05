// CRUD 

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27016';
const databaseName = 'task-manager';



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database'); 
    }
    const db = client.db(databaseName);

    // db.collection('users').findOne({
    //     _id: new ObjectID('5ca7d0c86ec47220476f64a3')
    // }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(user);
    // });

    // db.collection('users').find({
    //     age: 27
    // }).toArray((error, users) => {
    //    console.log(users) 
    // })

    // db.collection('users').find({
    //     age: 27
    // }).count((error, count) => {
    //    console.log(count) 
    // })

    db.collection('tasks').findOne({
        _id: new ObjectID('5ca7cc9c51bd7a1eb5f76a2e')
    }, (error, task) => {
        if (error) {
            return console.log(error);
        }
        console.log(task);
    });

    db.collection('tasks').find({
        completed: false
    }).toArray((error, tasks) => {
        if (error) {
            return console.log(error);
        }
        console.log(tasks);
    })
});



