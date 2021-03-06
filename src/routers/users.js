const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer =require('multer');
const sharp = require('sharp');
const { welcomeEmail, deleteAccountConfirmation } = require('../emails/mailer');
const avatar = multer({
  limits: {
    fileSize: 1000000 // 1mb
  },
  fileFilter(req, file, cb) {

    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File must be an image.'));
    }

    cb(undefined, true);

  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
        await user.save();
        welcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
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

router.patch('/users/myprofile', auth, async (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const updates = Object.keys(req.body);
  const isValidOperator = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperator) {
      return res.status(400).send({error: 'invalid data'});
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/myprofile', auth, async (req, res) => {
  try {
      deleteAccountConfirmation(req.user.email, req.user.name)
      await req.user.remove();
      res.send(req.user);
  } catch (error) {
      res.status(500).send()
  }
});

router.post('/users/myprofile/avatar', auth, avatar.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send( req.user );
}, (error, req, res, next) => {
  res.status(400).send( {error: error.message });
});

router.delete('/users/myprofile/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send()
  }
});


router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;