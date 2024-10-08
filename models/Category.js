const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,  // Ensure that slugs are unique
  },

 // Array of references to blog posts related to this category
 posts: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }
],
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
