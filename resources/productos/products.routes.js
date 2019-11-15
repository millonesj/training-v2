const express = require('express');
const {validateAdd, validateUpdate, validateDelete} = require('./products.validate');
const { logger } = require('../lib/logger');
const auth = require('../lib/authentication');
const { processError } = require('../lib/errorHandler');
const { ProductNoExist, OwnerNoExist, UnauthorizedToModify, UnauthorizedToDelete } = require('./products.error');
let productsController = require('./products.controller');
let usersController = require('../users/users.controller');
const productsRoutes = express.Router()

// LIST
productsRoutes.get('/', auth, processError(async (req, res) => {
    let products = await productsController.getAll();
      res.json(products)
}));

// CREATE
productsRoutes.post('/', auth, validateAdd, processError(async(req, res) => {
   let userSearched = await usersController.getById(req.body.owner);

   if (userSearched === null) throw new OwnerNoExist(`owner/user doesn't exist`)
    
    productsController.create(req.body);
    res.json({message: 'product created successfully'});

}))

// UPDATE
productsRoutes.put('/:id', auth, validateUpdate, processError(async (req, res) => {
    let idProduct = req.params.id;
    let productSearch = await productsController.getById(idProduct);
    
    if (productSearch === null) throw new ProductNoExist(`Producto no exist `);
    // rule: only owner can updating or deleting product
    if (productSearch.owner !== req.body.owner) throw new UnauthorizedToModify(`Unauthorized for delete this product `);

    let result = await productsController.update(idProduct, {...req.body});
    if (result) res.json({message: "product updated succesfully"})

}))

// DELETE
productsRoutes.delete('/:id', auth, processError(async(req, res) => {
    let productToDelete = await productsController.getById(req.params.id);
    if (productToDelete === null) throw new ProductNoExist(`Product no exist `);
    console.log(productToDelete);
       // rule: only owner can updating or deleting product
    if (productToDelete.owner !== req.body.owner) throw new UnauthorizedToDelete(`Unauthorized for delete this product `);
      let result = await productsController.remove(req.params.id);
      if (result)
      res.json({message: "product deleted succesfully",productDeleted: productToDelete});
}));

module.exports = productsRoutes;
