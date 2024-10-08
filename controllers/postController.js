const Post = require('../models/post');
const slugify = require('../utils/slugs');
const { convertMarkdownToHtml } = require('../utils/markdown'); // Import the utility
const Category = require('../models/category');



exports.createPost = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const slug = slugify(title);
        const htmlContent = convertMarkdownToHtml(content);
        
        const newPost = new Post({
            title,
            content,
            htmlContent,
            slug,
            categories,
            tags,
        });

        // Save the post
        await newPost.save();

        // Update the categories to include the new post
        await Category.updateMany(
          { _id: { $in: categories } }, // Find categories by IDs
          { $push: { posts: newPost._id } } // Push the post ID into the 'posts' array
        );

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
  };  exports.getPostBySlug = async (req, res) => {
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
        
        // Find the post to update
        const updatedPost = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            { title, content, htmlContent, categories, tags }, // Update all necessary fields
            { new: true, runValidators: true }
        );

        // If categories have changed, update them in the Category collection
        if (updatedPost) {
            // Remove the post ID from the old categories
            await Category.updateMany(
                { _id: { $in: updatedPost.categories } },
                { $pull: { posts: updatedPost._id } }
            );

            // Add the post ID to the new categories
            await Category.updateMany(
                { _id: { $in: categories } },
                { $addToSet: { posts: updatedPost._id } } // Use $addToSet to avoid duplicates
            );
        }

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
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


