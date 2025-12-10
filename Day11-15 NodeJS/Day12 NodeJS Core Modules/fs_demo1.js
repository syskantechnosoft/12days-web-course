const fs = require('fs');
const path = require('path');

// 1. Write File (Async) - Overwrites existing content
fs.writeFile('example.txt', 'Hello Node World!', (err) => {
    if (err) throw err;
    console.log('1. File created and written to.');

    // 2. Append File (Async) - Adds to end of file
    fs.appendFile('example.txt', '\nThis is appended text.', (err) => {
        if (err) throw err;
        console.log('2. Data appended.');

        // 3. Read File (Async)
        fs.readFile('example.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log('3. File Content:', data);

            // 4. Get File Stats (Size, Created time, etc.)
            fs.stat('example.txt', (err, stats) => {
                if (err) throw err;
                console.log(`4. File Size: ${stats.size} bytes`);

                // 5. Rename File
                fs.rename('example.txt', 'newname.txt', (err) => {
                    if (err) throw err;
                    console.log('5. File renamed to newname.txt');

                    // 6. Delete File (Unlink)
                    fs.unlink('newname.txt', (err) => {
                        if (err) throw err;
                        console.log('6. File deleted.');
                    });
                });
            });
        });
    });
});
