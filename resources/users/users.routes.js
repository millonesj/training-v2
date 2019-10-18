const express = require('express');
const uuid = require('uuid/v4');
const router = express.Router();
const userValidate = require('./users.validate');
let users = require('../../db').users;
router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', userValidate, (req, res) => {
  let newUser = {...req.body, id:uuid()};
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

module.exports = router
