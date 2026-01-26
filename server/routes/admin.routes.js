const express = require('express');
const router = express.Router();

const adminAuth = require('../middleware/adminAuth');

const adminController = require('../controllers/admin.controller')


router.post('/categories', adminAuth, adminController.addCategory);
router.get('/categories', adminAuth, adminController.getCategories);
router.get('/categories/:id', adminAuth, adminController.editCategory);
router.patch('/categories/:id', adminAuth, adminController.updateCategory);
router.delete('/categories/:id', adminAuth, adminController.deleteCategory);


router.post('/brands', adminAuth, adminController.addBrand);
router.get('/brands', adminAuth, adminController.getBrands);
router.get('/brands/:id', adminAuth, adminController.editBrand);
router.patch('/brands/:id', adminAuth, adminController.updateBrand);
router.delete('/brands/:id', adminAuth, adminController.deleteBrand);


router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminAuth, adminController.deleteUser);
router.patch('/users/:id/toggle-block', adminAuth, adminController.toggleBlockUser);


router.get('/sellers', adminController.getSellers);
router.delete('/sellers/:id', adminAuth, adminController.deleteSeller);
router.patch('/sellers/:id/toggle-block', adminAuth, adminController.toggleBlockSeller);

module.exports = router;