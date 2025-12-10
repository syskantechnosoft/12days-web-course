// Validation middleware for post creation/update
const validatePost = (req, res, next) => {
  const { title, content, author } = req.body;
  const errors = [];
  
  // Validate title
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length < 5) {
    errors.push('Title must be at least 5 characters long');
  } else if (title.length > 100) {
    errors.push('Title must not exceed 100 characters');
  }
  
  // Validate content
  if (!content || content.trim().length === 0) {
    errors.push('Content is required');
  } else if (content.length < 20) {
    errors.push('Content must be at least 20 characters long');
  }
  
  // Validate author
  if (!author || author.trim().length === 0) {
    errors.push('Author name is required');
  } else if (author.length < 2) {
    errors.push('Author name must be at least 2 characters long');
  }
  
  // If errors exist, send error response
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }
  
  // Sanitize inputs (basic)
  req.body.title = title.trim();
  req.body.content = content.trim();
  req.body.author = author.trim();
  
  next();
};

module.exports = { validatePost };
