const Joi = require('@hapi/joi');
const UserSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(2).max(100).required(),
  username: Joi.string().alphanum().min(2).max(50).required(),
  password: Joi.string().min(6).max(20).required(),
  email: Joi.string().email(),
  cellphone: Joi.number().min(900000000).max(999999999).required(),
});

const validateUser = (req, res, next) => {
  const validation = UserSchema.validate(req.body);
  if (validation.error) return res.status(403).json({"message": validation.error})

  next()
}

module.exports = validateUser;
