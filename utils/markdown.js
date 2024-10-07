const marked = require('marked');

const convertMarkdownToHtml = (markdown) => {
    return marked(markdown);
};

module.exports = {
    convertMarkdownToHtml,
};
