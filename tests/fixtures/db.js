const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new ObjectId();
const userOne = {
  _id: userOneId,
  name: 'test_name',
  email: 'test@email.com',
  password: 'testpass1',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
}
const userToInsert = {
  name: 'Alejandro',
  email: 'ale97@email.com',
  password: 'qwerty1!'
}
const userTwoId = new ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Second_User',
  email: 'prueba@email.com',
  password: 'testpass2',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
}

const taskOne = {
  _id: new ObjectId(),
  description: 'First task',
  completed: true,
  owner: userOne._id
}
const taskTwo = {
  _id: new ObjectId(),
  description: 'Second task',
  completed: true,
  owner: userOne._id
}
const taskThree = {
  _id: new ObjectId(),
  description: 'Third task',
  completed: false,
  owner: userTwo._id
}

const setDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
}

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userToInsert,
  taskOne,
  taskTwo,
  taskThree,
  setDatabase
};

