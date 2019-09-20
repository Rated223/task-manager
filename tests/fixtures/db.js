const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user')

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


const setDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
}

module.exports = {
  userOneId,
  userOne,
  userToInsert,
  setDatabase
};

