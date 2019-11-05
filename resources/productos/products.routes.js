const express = require('express');
const {validateAdd, validateUpdate, validateDelete} = require('./products.validate');
const { logger } = require('../lib/logger');
const auth = require('../lib/authentication');
let productsController = require('./products.controller');
let usersController = require('../users/users.controller');
const productsRoutes = express.Router()

// LIST
productsRoutes.get('/', auth, async (req, res) => {
  try {
    let products = await productsController.getAll();
    res.json(products)
  } catch (error) {
    logger.error('error listing products', {  error: error.toString() });
    res.status(500).json({"message": "An unknown error occurred."})
  }
});

// CREATE
productsRoutes.post('/', auth, validateAdd, async(req, res) => {
  try {
   let userSearched = await usersController.getById(req.body.owner);
   if (userSearched === null) {
    res.status(403).send("owner/user doesn't exist");
   }else {
     productsController.create(req.body);
     res.json({message: 'product created successfully'});
   }
  } catch (error) {
    logger.error('error creating product', {  error: error.toString() })
    res.json({message:'An unknown error ocurred.'});
  }
})

// UPDATE
productsRoutes.put('/:id', auth, validateUpdate, async (req, res) => {
  try {
    let idProduct = req.params.id;
    let productSearch = await productsController.getById(idProduct);
    if (productSearch === null){
      res.json({message:"producto no exist "})
    } else {
      if (productSearch.owner === req.body.owner) { // rule: only owner can updating or deleting product
        await productsController.update(idProduct, {...req.body});
        res.json({message: "product updated succesfully"})
      } else {
        res.status(401).send('Unauthorized for update or delete this product');
      }
    };
  } catch (error) {
    logger.error('error updating product', {  error: error.toString() })
    res.json({message:'An unknown error ocurred.'});
  }
})

// DELETE
productsRoutes.delete('/:id', auth, async(req, res) => {
  try {
    let productToDelete = await productsController.getById(req.params.id);
    if (productToDelete === null) {
      res.json({message:"product doesn't exist"})
    } else {
      if (productToDelete.owner === req.body.owner) { // rule: only owner can updating or deleting product
        await productsController.remove(req.params.id);
        res.json({message: "product deleted succesfully",productDeleted: productToDelete});
      } else {
        res.status(401).send('Unauthorized for update or delete this product');
      }
    }
  } catch (error) {
    logger.error('error deleting product', {  error: error.toString() })
    res.json({message:'An unknown error ocurred.'});
  }
});

module.exports = productsRoutes;
