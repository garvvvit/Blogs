const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Create, Read, Update, Delete (CRUD) operations
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:slug', categoryController.getCategoryBySlug);
router.put('/:slug', categoryController.updateCategory);
router.delete('/:slug', categoryController.deleteCategory);

module.exports = router;
