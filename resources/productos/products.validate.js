const Joi = require('@hapi/joi')

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().min(3).max(3).required(),
  owner: Joi.required(),
});

const validateAdd  = (req, res, next) => {
  const validation = productSchema.validate(req.body);
  if (validation.error) return res.status(403).json({"message": "Invalid data, please validate"});
  next();
}

const validateUpdate = (req, res, next) => {
  const validation = productSchema.validate(req.body);
  if (validation.error) return res.status(403).json({"message": "Invalid data, please validate"});
  next();
}


module.exports = {
  validateAdd,
  validateUpdate,
};
