const Category = require('../models/Category'); // Ensure case matches the file name

const slugify = require('../utils/slugs');

exports.createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      
      // Generate a slug from the name
      const slug = slugify(name); 
  
      // Check if the category already exists (based on the slug)
      const existingCategory = await Category.findOne({ slug });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with this slug already exists' });
      }
  
      // Create the new category with the slug
      const newCategory = new Category({ name, slug });
      
      // Save the category to the database
      await newCategory.save();
  
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

//Get all categories

exports.getAllCategories = async (req,res) => {
    try{
        const categories = await Category.find().populate('posts');
        res.status(200).json(categories);
    } catch(error) {
        res.status(400).json({message:error.message});

    }
    
};
// Get a category by slug
exports.getCategoryBySlug = async (req, res) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug }).populate('posts');
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //Update with a category

  exports.updateCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const slug = generateSlug(name);
  
      const updatedCategory = await Category.findOneAndUpdate(
        { slug: req.params.slug.toLowerCase() },
        { name, slug },
        { new: true,runValidators: true }
      );

    if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a category
exports.deleteCategory = async (req, res) => {
    try {
      await Category.findOneAndDelete({ slug: req.params.slug });
      res.status(204).json({ message: 'Category deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


