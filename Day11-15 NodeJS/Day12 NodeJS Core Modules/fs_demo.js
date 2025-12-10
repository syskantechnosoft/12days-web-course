const fs = require('fs');
//Async Write file without error handling
fs.writeFile('welcome.txt', 'Hello Node', err => 
  console.log('1.File created successfully!')
);

//Async Write File with error handling
fs.writeFile('./welcome.txt', 'Hello Error handler Node', (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('2.File created successfully!');
  }
});

//async read file with error handling
fs.readFile('./welcome.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('3.File content:', data);
  }
});

//Async file append with error handling
fs.appendFile('./welcome.txt', ' This is the appended text.', (err) => {
  if (err) {
    console.error('Error appending to file:', err);
  } else {
    console.log('4.Text appended successfully!');
  }
});

//Async file read without error handling
fs.readFile('./welcome.txt', 'utf8', (err, data) => {
  console.log("5.file contents:",data);
});


