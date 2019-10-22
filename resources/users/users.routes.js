const express = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidate = require('./users.validate');
let users = require('../../db').users;
const auth = require('../../resources/lib/authentication');
const router = express.Router();

router.get('/', auth,(req, res) => {
  res.json(users);
});

router.post('/', userValidate, (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10)
  let newUser = {...req.body, id:uuid(), password: hashPassword};

  users.push(newUser);
  res.json(newUser);
})

router.put('/:id', auth, (req, res) => {
  let userIndexSearched  = users.findIndex(user => user.id === req.params.id)
  if (userIndexSearched === -1) {
    res.json({"message": "user doesn't exist"})
  } else {
    users[userIndexSearched] =  {...users[userIndexSearched],...req.body}
    res.json({"message": "User updated"})
  }

});

router.delete('/:id', auth, (req, res) => {
  let userIndexSearched  = users.findIndex(user => user.id === req.params.id)
  if (userIndexSearched === -1) {
    res.json({"message": "User doesn't exist"})
  } else {
    users.splice(userIndexSearched,1);
    res.json({"message": "User deleted succesfully"})
  }
})

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userSearched = users.filter(user => user.username === username)[0];
  if (userSearched) {

    const isAuthenticated = bcrypt.compareSync(password, userSearched.password);
    if (isAuthenticated) {
      const token = jwt.sign({ id: userSearched.id }, 'SECRET_KEY', { expiresIn: '10h' })
      res.json({ token })
    } else {
      res.status(401).send('incorrect username or password');
    }

  } else {
    res.json({message:"user doesn't exist"})
  }

});

module.exports = router;
