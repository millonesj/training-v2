const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidate = require('./users.validate');
const auth = require('../../resources/lib/authentication');
const userController = require('./users.controller');
const { getRandomInt } = require('../lib/utils');
const sendSMS = require('../lib/sms-sender');
const router = express.Router();
const { processError } = require('../lib/errorHandler');
const { InvalidAuthentication, UserNoExist, UsernameAlreadyExists, InvalidCode } = require('./users.error');

router.get('/',  processError(async(req, res) => {
    let users = await userController.getAll();
    res.json(users);
}));

router.post('/register', userValidate, processError(async(req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    let verificationCode = getRandomInt(100000,999999);
    let newUser = { ...req.body, password: hashPassword, verificationCode,verified: false };
    let resUser =  await userController.create(newUser);
    if (resUser){
      sendSMS(req.body.cellphone,verificationCode);
      res.json({message: 'User registerd succesfully. We have sent your verification code to your cell phone'});
    }
}))

router.post('/verify', processError(async (req, res)  => {
    const username = req.body.username;
    const verificationCode = parseInt(req.body.verificationCode);
    const userSearched = await userController.getOne({username});
    if (userSearched === null) throw new UsernameAlreadyExists('User exist');
    if (!(userSearched.verificationCode === verificationCode)) throw new InvalidCode('User exist');
    await userController.update(userSearched._id, {verified:true});
    res.json({"message": "Account verified succesfully"})

}));

router.post('/', userValidate, processError(async(req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  let newUser = {...req.body, password: hashPassword};
  let username = req.body.username;
  let userSearched = await userController.getOne({username})
  if (userSearched) throw new UsernameAlreadyExists('User exist');
  let result = await userController.create(newUser);
  if (result) res.json(newUser);
}));

router.put('/:id', auth, processError(async(req, res) => {

  let userSearched = await userController.getById(req.params.id);
  if (userSearched === null ) throw new UserNoExist("User doesn't exist");

  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  let result = await userController.update(req.params.id, {...userSearched._doc, ...req.body, password: hashPassword});
  if (result) {
    res.status(200).json({"message": "User updated"});
  }

}));

router.delete('/:id', auth, processError(async(req, res) => {
  let userIndexSearched = await userController.remove({_id:req.params.id});
  if (userIndexSearched ===  null) throw new UserNoExist("user doesn't exist");

    return res.json({"message": "User deleted succesfully"})

}))

router.post('/login', processError(async (req, res)  => {
  const username = req.body.username;
  const password = req.body.password;
  const userSearched = await userController.getOne({username});
  console.log(userSearched);
  if (userSearched === null) throw new UserNoExist("user doesn't exist");
  const isAuthenticated = bcrypt.compareSync(password, userSearched.password);
  if (!(isAuthenticated)) throw new InvalidAuthentication("Username or password  invalid")
  const token = jwt.sign({ id: userSearched.id }, 'SECRET_KEY', { expiresIn: '10h' })
  res.json({ token })

}));

module.exports = router;
