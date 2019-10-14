const express = require('express')
const uuidv4 = require('uuid/v4');


const validateProduct = require('./products.validate');

let products = require('../../db').products;

const productsRoutes = express.Router()

productsRoutes.get('/', (req, res) => {
  res.json(products);
});

productsRoutes.post('/', validateProduct, (req, res) => {
  const newProduct = { ...req.body, id: uuidv4() };
  products.push(newProduct);
  res.json(newProduct);
})

productsRoutes.put('/:id', (req, res) => {
  let idProduct = req.params.id;
  let productSearch = products.filter(product => product.id === idProduct)[0];
  if (productSearch){
    products = products.filter(product => product.id !== idProduct);
    products.push({...productSearch,...req.body});
    res.json({msg: "Updated"})
  } else {
    res.json({msg:"producto no exist "})
  };
})

// DESTROY

productsRoutes.delete('/:id', (req, res) => {
  let productToDelete = products.filter(product => product.id === req.params.id);

  if (productToDelete.length) {
    products = products.filter(product => product.id !== req.params.id)
    res.json({msg: "product deleted succesfully",productDeleted: productToDelete});
  } else {
    res.json({msg:"product doesn't exist"})
  }
});


module.exports = productsRoutes;
