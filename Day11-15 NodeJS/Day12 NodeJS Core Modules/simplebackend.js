const http = require('http');

const server = http.createServer((req, res) => {
    // 1. Log the method and URL
    console.log(`${req.method} request to ${req.url}`);

    // 2. Routing Logic
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Home Page');
    } 
    else if (req.url === '/api/courses' && req.method === 'GET') {
        // Return JSON
        const courses = [{ id: 1, name: 'Node.js' }, { id: 2, name: 'React' }];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(courses));
    } 
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Us</h1>');
    } 
    else {
        // 404 Handle
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h2>Page Not Found</h2>');
    }
});

// 3. Listen on Port
const PORT = 3010;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
