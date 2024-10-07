const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagControllers');

// Create, Read, Update, Delete (CRUD) operations
router.post('/', tagController.createTag);
router.get('/', tagController.getAllTags);
router.get('/:slug', tagController.getTagBySlug);
router.put('/:slug', tagController.updateTag);
router.delete('/:slug', tagController.deleteTag);

module.exports = router;
