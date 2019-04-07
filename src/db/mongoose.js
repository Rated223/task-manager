const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.contains(value.toLowerCase(), 'password')) {
                throw new Error('The password should not include "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// const user = new User({
//     name: '        Daniel2',
//     email: 'Rated2223@outlook.com        ',
//     password: '   123456password'
// });

// user.save().then(() => {
//     console.log(user);
// }).catch((error) => {
//     console.log('Error: ', error);
// });

const task = new Task({
    description: '             task 1             ',
    // completed: false
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log('Error', error);
});