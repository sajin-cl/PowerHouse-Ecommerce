const express = require('express');
const router = express.Router();

const sellerAuth = require('../middleware/sellerAuth');

const productsController = require('../controllers/product.controller');

//PUBLIC (Customers)
router.get('', productsController.getProducts);
router.get('/:id', productsController.getProductsId);

//PRIVATE (Sellers)
router.post('', sellerAuth, productsController.addProducts);
router.patch('/:id', sellerAuth, productsController.updateProducts);
router.delete('/:id', sellerAuth, productsController.deleteProduct);


module.exports = router;