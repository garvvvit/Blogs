// utils/slugs.js
const slugify = (title) => {
    return title
      .toString()  // Ensure the input is a string
      .toLowerCase()  // Convert to lowercase
      .trim()  // Remove any leading or trailing whitespace
      .replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove any non-word characters
      .replace(/\-\-+/g, '-')  // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, '')  // Trim hyphens from the start
      .replace(/-+$/, '');  // Trim hyphens from the end
};

module.exports = slugify;  // Export slugify directly
