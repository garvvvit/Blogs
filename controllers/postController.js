const Post = require('../models/post');
const slugify = require('../utils/slugs');
const { convertMarkdownToHtml } = require('../utils/markdown'); // Import the utility

exports.createPost = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const slug = slugify(title);
        const htmlContent = convertMarkdownToHtml(content); // Use the utility to convert Markdown to HTML
        
        const newPost = new Post({
            title,
            content,
            htmlContent,
            slug,
            categories,
            tags,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('categories tags');
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  exports.getPostBySlug = async (req, res) => {
    try {
      const post = await Post.findOne({ slug: req.params.slug }).populate('categories tags');
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.updatePost = async (req, res) => {
    try {
      const { title, content, categories, tags } = req.body;
      const htmlContent = convertMarkdownToHtml(content);
  
      const updatedPost = await Post.findOneAndUpdate(
        { slug: req.params.slug },
        { title, content, htmlContent, categories, tags },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.deletePost = async (req, res) => {
    try {
      await Post.findOneAndDelete({ slug: req.params.slug });
      res.status(204).json({ message: 'Post deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Add other methods (getPosts, getPostById, updatePost, deletePost)
