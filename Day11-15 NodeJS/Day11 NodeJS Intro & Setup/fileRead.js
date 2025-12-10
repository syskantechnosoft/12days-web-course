const fs = require('fs');

// Create a dummy file for demonstration
try {
  fs.writeFileSync('example.txt', 'Hello from Node.js readFileSync!');
} catch (err) {
  console.error('Error creating example.txt:', err);
}

try {
  // Read the content of 'example.txt' synchronously
  // Specify 'utf8' encoding to get a string; otherwise, a Buffer is returned.
  const fileContent = fs.readFileSync('example.txt', 'utf8');

  console.log('File content:', fileContent);
} catch (err) {
  // Handle any errors that occur during file reading
  console.error('Error reading file:', err);
}