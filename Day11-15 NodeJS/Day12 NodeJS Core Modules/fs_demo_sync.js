const fs = require('fs');

try {
    fs.writeFileSync('manual.txt', 'Hello  Node World!!!');
    // We use try/catch for sync errors
    if(fs.existsSync('JS Array Methods.pdf')) {
        const data = fs.readFileSync('JS Array Methods.pdf', 'utf8');
        console.log('Sync Read:', data);
    } else {
        console.log('File does not exist');
    }
} catch (err) {
    console.error(err);
}
