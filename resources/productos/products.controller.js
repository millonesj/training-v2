const Product = require('./products.models');

function create(product) {
  return new Product(product).save();
}

function getAll() {
  return Product.find({});
}

function update(id, product) {
  return Product.findOneAndUpdate({ _id: id}, product,  {new: false, useFindAndModify: false});
}

function getOne(filter) {
    let product = Product.findOne(filter);
    return product;
}

function getById(id) {
    let product = Product.findById(id);
    return product;
}
function remove(id) {
  return Product.findOneAndDelete(id);
}

module.exports = {
  create,
  getAll,
  getOne,
  getById,
  update,
  remove,
}
