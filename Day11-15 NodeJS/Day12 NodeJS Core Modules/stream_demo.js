const fs = require('fs');

// Create a large dummy file first if it doesn't exist
if (!fs.existsSync('largefile.txt')) {
    fs.writeFileSync('largefile.txt', 'Some data \n'.repeat(100000));
}

// 1. Create Readable Stream
// highWaterMark controls the buffer size (default 64kb)
const readStream = fs.createReadStream('largefile.txt', { encoding: 'utf8', highWaterMark: 16 * 1024 }); 

// 2. Create Writable Stream
const writeStream = fs.createWriteStream('copy_of_largefile.txt');

// 3. Listen to Stream Events
readStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data...`);
    // Manually writing (Slow way)
     writeStream.write(chunk);
});

readStream.on('end', () => {
    console.log('Finished reading file.');
});

readStream.on('error', (err) => {
    console.error('An error occurred:', err);
});

// 4. The "Magic" Pipe Method (Fast way)
// This handles "backpressure" automatically (reads only as fast as it can write)
const readStream2 = fs.createReadStream('largefile.txt');
const writeStream2 = fs.createWriteStream('piped_copy.txt');

readStream2.pipe(writeStream2);
console.log('Piping data...');
