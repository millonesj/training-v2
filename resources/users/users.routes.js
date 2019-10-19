const express = require('express')
const uuidv4 = require('uuid/v4');

const bcrypt = require('bcrypt')

let users = require('../../db').users;

const usersRoutes = express.Router()

usersRoutes.get('/', (req, res) => {
  res.json(users);
});

usersRoutes.post('/', (req, res) => {
  const hp = bcrypt.hashSync(req.body.password, 10)

  const newUser = { ...req.body, id: uuidv4(), password: hp };

  users.push(newUser);
  res.json(newUser);
})

usersRoutes.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.filter(user => user.username === username)[0]

  const isAuthenticated = bcrypt.compareSync(password, user.password);

  if (isAuthenticated) {
    // CREAR UN JWT
    res.json({ token: '123123123213' })
  } else {
    res.status(401).send('Verifica tu password');
  }
})


module.exports = usersRoutes;
