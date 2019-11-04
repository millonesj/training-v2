const mongoose = require('mongoose');

// TODO: añadir mas validaciones
const productoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The product should have a name']
  },
  price: {
    type: Number,
    min: 0,
    required: [true, 'The product should have a price']
  },
  currency: {
    type: String,
    maxlength: 3,
    minlength: 3,
    required: [true, 'The product should have a currency']
  },
  owner: {
    type: String,
    required: [true, 'The product should have an owner']
  },
});

module.exports = mongoose.model('producto', productoSchema);
