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
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
