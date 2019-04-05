// CRUD 

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27016';
const databaseName = 'task-manager';



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database'); 
    }
    const db = client.db(databaseName);

    db.collection('users').findOne({
        name: 'Jen',
        age: 1
    }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(user);
    })
});



