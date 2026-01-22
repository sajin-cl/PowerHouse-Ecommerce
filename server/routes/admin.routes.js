const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller')


router.post('/category', adminController.addCategory);
router.get('/category', adminController.getCategories);



module.exports = router;