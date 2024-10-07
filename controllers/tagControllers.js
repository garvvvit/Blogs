const Tag = require('../models/Tag');
const { generateSlug } = require('../utils/slugs');

// Create a new tag
exports.createTag = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Generate a slug from the tag name
      const slug = generateSlug(name);
  
      // Check if a tag with this slug already exists
      const existingTag = await Tag.findOne({ slug });
      if (existingTag) {
        return res.status(400).json({ message: 'Tag with this slug already exists' });
      }
  
      // Create the new tag with the slug
      const newTag = new Tag({ name, slug });
  
      // Save the tag to the database
      await newTag.save();
  
      res.status(201).json(newTag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a tag by slug
exports.getTagBySlug = async (req, res) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a tag
exports.updateTag = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = generateSlug(name);

    const updatedTag = await Tag.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug },
      { new: true }
    );

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a tag
exports.deleteTag = async (req, res) => {
  try {
    await Tag.findOneAndDelete({ slug: req.params.slug });
    res.status(204).json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
