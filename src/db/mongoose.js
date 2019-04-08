const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27016/task-manager', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})