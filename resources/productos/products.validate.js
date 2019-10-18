const Joi = require('@hapi/joi')
const users = require('../../db').users;
const products = require('../../db').products;

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().min(3).max(3).required(),
  owner: Joi.required(),
});

const validateAdd  = (req, res, next) => {
  const validation = productSchema.validate(req.body);
  if (validation.error) return res.status(403).json({"message": "Invalid data, please validate"});

  for (let index = 0; index < users.length; index++) 
    if (users[index].id == req.body.owner) return next();

  return res.status(403).send("owner/user doesn't exist");

}

const validateUpdate = (req, res, next) => {
  const validation = productSchema.validate(req.body);
  const productDB = products.filter(product => product.id === req.params.id)[0];
  if (validation.error) return res.status(403).json({"message": "Invalid data, please validate"});
  if (productDB)
    if (productDB.owner !== req.body.owner)return res.status(401).send('Unauthorized for update or delete this product');

  next();

}

const validateDelete = (req, res, next) => {
  const productDB = products.filter(product => product.id === req.params.id)[0];
  if (productDB)
    if (productDB.owner !== req.body.owner)return res.status(401).send('Unauthorized for update or delete this product');

  next();

}


module.exports = {
  validateAdd,
  validateUpdate,
  validateDelete
};
