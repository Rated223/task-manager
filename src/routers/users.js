const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
        await user.save();
        const token = await new_user.generateAuthToken();
        res.status(201).send({ user, token });
  } catch (error) {
        res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.get('/users/myprofile', auth, async (req, res) => {
  try {
      res.send(req.user);
  } catch (error) {
      res.status(500).send();
  }
});

router.get('/users/:id', async (req, res) => {
  try {
      const user = await User.findById(_id);
      if (!user) {
          return res.status(404).send();
      }
      res.send(user);
  } catch (error) {
      res.status(500).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const updates = Object.keys(req.body);
  const isValidOperator = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperator) {
      return res.status(400).send({error: 'invalid data'});
  }
  const _id = req.params.id;
  try {
    //   const user = await User.findByIdAndUpdate(_id, req.body, { new:true, runValidators: true });
    const user = await User.findById(req.params.id);

    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();

    if (!user) {
        return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).send();
      }
      res.send(user);
  } catch (error) {
      res.status(500).send()
  }
});

module.exports = router;