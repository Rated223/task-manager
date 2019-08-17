const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById("5d5735d4d0c3e31738aca758");
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('5d5728e791153d2388ebb864')
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}

main();