const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'task 1',
    completed: false
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log('Error', error);
});