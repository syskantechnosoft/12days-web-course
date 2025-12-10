const express = require('express');
const path = require('path');
const loggerMiddleware = require('./middleware/logger');
const { validatePost } = require('./middleware/validator');

const app = express();
const PORT = 3001;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(loggerMiddleware);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory blog posts database
let posts = [
  {
    id: 1,
    title: 'Getting Started with Express',
    content: 'Express.js is a minimal and flexible Node.js web application framework...',
    author: 'John Doe',
    createdAt: new Date('2024-01-15'),
    likes: 42
  },
  {
    id: 2,
    title: 'Understanding Middleware',
    content: 'Middleware functions are functions that have access to the request object...',
    author: 'Jane Smith',
    createdAt: new Date('2024-02-20'),
    likes: 38
  },
  {
    id: 3,
    title: 'Working with Template Engines',
    content: 'Template engines allow you to generate HTML dynamically...',
    author: 'Bob Johnson',
    createdAt: new Date('2024-03-10'),
    likes: 27
  }
];

// Routes

// Home page - List all posts
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Blog Home',
    posts: posts.sort((a, b) => b.createdAt - a.createdAt)
  });
});

// View single post
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).render('error', {
      title: 'Error',
      message: 'Post not found'
    });
  }
  
  res.render('post', {
    title: post.title,
    post: post
  });
});

// Create post form
app.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create New Post'
  });
});

// Handle post creation
app.post('/posts', validatePost, (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date(),
    likes: 0
  };
  
  posts.push(newPost);
  
  res.redirect('/');
});

// Update post
app.put('/api/posts/:id', validatePost, (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  posts[postIndex] = {
    ...posts[postIndex],
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  
  res.json({
    message: 'Post updated successfully',
    post: posts[postIndex]
  });
});

// Like a post
app.patch('/api/posts/:id/like', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  post.likes += 1;
  
  res.json({
    message: 'Post liked',
    likes: post.likes
  });
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const deletedPost = posts.splice(postIndex, 1)[0];
  
  res.json({
    message: 'Post deleted successfully',
    post: deletedPost
  });
});

// Search posts
app.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  
  const results = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.content.toLowerCase().includes(query) ||
    post.author.toLowerCase().includes(query)
  );
  
  res.render('index', {
    title: `Search Results for "${query}"`,
    posts: results,
    searchQuery: query
  });
});

// API endpoint - Get all posts as JSON
app.get('/api/posts', (req, res) => {
  res.json({
    count: posts.length,
    posts: posts
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: '404 - Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  res.status(err.status || 500).render('error', {
    title: 'Error',
    message: err.message || 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog server running on http://localhost:${PORT}`);
});
