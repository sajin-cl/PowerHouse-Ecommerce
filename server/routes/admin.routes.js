const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller')


router.post('/categories', adminController.addCategory);
router.get('/categories', adminController.getCategories);
router.get('/categories/:id', adminController.editCategory);
router.patch('/categories/:id', adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);


router.post('/brands', adminController.addBrand);
router.get('/brands', adminController.getBrands);


module.exports = router;