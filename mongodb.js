// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27016';
const databaseName = 'task-manager';



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database'); 
    }
    const db = client.db(databaseName);

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5ca7cb1e7edc981e19585b01')
    // }, {
    //     $inc: { //Operator to make the changes
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(ERROR)
    })
});



