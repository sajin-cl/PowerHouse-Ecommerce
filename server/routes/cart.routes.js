const express = require('express');
const router = express.Router();

const userAuth = require('../middleware/userAuth').default;

const cartController = require('../controllers/cart.controller');

router.post('/', userAuth, cartController.addToCart);
router.get('/', userAuth, cartController.getUserCart);
router.patch('/:id', userAuth, cartController.updateCartItems);
router.delete('/:id', userAuth, cartController.removeCartItem);


module.exports = router;