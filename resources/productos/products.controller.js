const Product = require('./products.models');

function create(product) {
  return new Product(product).save();
}

function getAll() {
  return Product.find({});
}

function getOne(id) {
  return Product.findById(id);
}

function update(id, product) {
   let result =  Product.findOneAndUpdate({ _id: id},
    product, { new: true });
    return result;
}

function remove(id) {
  return Producto.findOneAndDelete(id);
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
}
