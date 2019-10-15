const Joi = require('@hapi/joi');
const UserSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(100).required(),
  nickname: Joi.string().alphanum().min(2).max(50).required()
});

const validateUser = (req, res, next) => {
  const validation = UserSchema.validate(req.body);
console.log(validation);
  if (validation.error) return res.status(403).json({"msg": "Data is wrong, please validate"})

  next()
}

module.exports = validateUser;
