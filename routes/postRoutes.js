const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:slug', postController.getPostBySlug);
router.put('/:slug', postController.updatePost);
router.delete('/:slug', postController.deletePost);

module.exports = router;
