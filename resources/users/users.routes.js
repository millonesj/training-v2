const express = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = express.Router();
const userValidate = require('./users.validate');
let users = require('../../db').users;

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', userValidate, (req, res) => {
  let newUser = {...req.body, id:uuid(), password: hashPassword};
  const hashPassword = bcrypt.hashSync(req.body.password, 10)

  users.push(newUser);
  res.json(newUser);
})

router.put('/:id', (req, res) => {
  let userIndexSearched  = users.findIndex(user => user.id === req.params.id)
  if (userIndexSearched === -1) {
    res.json({"message": "user doesn't exist"})
  } else {
    users[userIndexSearched] =  {...users[userIndexSearched],...req.body}
    res.json({"message": "User updated"})
  }

});

router.delete('/:id', (req, res) => {
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

  const user = users.filter(user => user.username === username)[0]

  const isAuthenticated = bcrypt.compareSync(password, user.password);

  if (isAuthenticated) {
    const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '10h' })

    res.json({ token })
  } else {
    res.status(401).send('Verifica tu password');
  }
})

module.exports = router
