const express = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidate = require('./users.validate');
const {logger} = require('../lib/logger');
const auth = require('../../resources/lib/authentication');
const userController = require('./users.controller');
const { getRandomInt } = require('../lib/utils');
const sendSMS = require('../lib/sms-sender');
const router = express.Router();

router.get('/', auth, async(req, res) => {
  try {
    let users = await userController.getAll();
    res.json(users);
  } catch (error) {
    logger.error('error listing users',{ error })
    res.status(500).json({"message": "An unknown error occurred."});
  }
});

router.post('/register', userValidate, async(req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    let verificationCode = getRandomInt(100000,999999);
    let newUser = { ...req.body, password: hashPassword, verificationCode,verified: false };
    await userController.create(newUser);
    sendSMS(req.body.cellphone,verificationCode);
    res.json({message: 'User registerd succesfully. We have sent your verification code to your cell phone'});
  } catch (error) {
    logger.error('error registering user', { error: error.toString() });
    res.status(500).json({"message": "An unknown error occurred."});
  }
})

router.post('/verify', async (req, res)  => {
  try {
    const username = req.body.username;
    const verificationCode = parseInt(req.body.verificationCode);
    const userSearched = await userController.getOne({username});
    if (userSearched === null) {
      res.json({message:"user doesn't exist"})

    } else {
      if (userSearched.verificationCode === verificationCode) {
        await userController.update(userSearched._id, {verified:true});
        res.json({"message": "Account verified succesfully"})
      } else {
        res.status(401).send({"message": 'Incorrect code'});
      }
    }
  } catch (error) {
    logger.error('login error',{ error: error.toString() })
    res.status(500).json({"message": "An unknown error occurred."});
  }

});

router.post('/', userValidate, (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    let newUser = {...req.body, password: hashPassword};

    userController.create(newUser)
    res.json(newUser);
  } catch (error) {
    logger.error('error creating user',{ error })
    res.status(500).json({"message": "An unknown error occurred."});
  }
})

router.put('/:id', auth, async(req, res) => {
  try {
    let userSearched = await userController.getById(req.params.id);
    if (userSearched === null ) {
      res.status(404).json({"message": "User doesn't exist"})
    } else {
      const hashPassword = bcrypt.hashSync(req.body.password, 10);
      await userController.update(req.params.id, {...userSearched._doc, ...req.body, password: hashPassword});
      res.status(200).json({"message": "User updated"});
    }
    
  } catch (error) {
      logger.error('error updating user',{ error })
      res.status(500).json({"message": "An unknown error occurred."});
  }
});

router.delete('/:id', auth, async(req, res) => {
  try {
    let userIndexSearched = await userController.remove({_id:req.params.id});
    if (userIndexSearched ===  null) {
      return res.json({"message": "User doesn't exist"})
    } else {
      return res.json({"message": "User deleted succesfully"})
    }
  } catch (error) {
    logger.error('error deleting user',{ error })
    res.status(500).json({"message": "An unknown error occurred."});
  }
})

router.post('/login', async (req, res)  => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const userSearched = await userController.getOne({username});
    if (userSearched === null) {
      res.json({message:"user doesn't exist"})

    } else {
      const isAuthenticated = bcrypt.compareSync(password, userSearched.password);
      if (isAuthenticated) {
        const token = jwt.sign({ id: userSearched.id }, 'SECRET_KEY', { expiresIn: '10h' })
        res.json({ token })
      } else {
        res.status(401).send('incorrect username or password');
      }
    }
  } catch (error) {
    logger.error('login error',{ error: error.toString() })
    res.status(500).json({"message": "An unknown error occurred."});
  }

});

module.exports = router;
