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
  let  exist = false;

    for (let index = 0; index < users.length; index++) {
      if (users[index].id === req.params.id) {
        users[index] =  {...users[index],...req.body}
        exist = true;
        break;
      }
    }

  if (exist) {
    res.json({"msg": "User updated"})
  }else{
    res.json({"msg": "user doesn't exist"})
  }
});

router.delete('/:id', (req, res) => {
  let deleted = false;
  for (let index = 0; index < users.length; index++) {
    if (users[index].id === req.params.id) {
      users.splice(index,1);
      deleted = true;
      break;
    }
  }
  if (deleted) {
    res.json({"msg": "User deleted succesfully"})
  } else {
    res.json({"msg": "User doesn't exist"})
  }
})

module.exports = router
