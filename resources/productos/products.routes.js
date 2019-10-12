const express = require('express')

const products = require('../../db').products;

const productsRoutes = express.Router()

productsRoutes.get('/', (req, res) => {
  console.log('GET IN PRODUCTS');
  res.json(products);
});


module.exports = productsRoutes;
