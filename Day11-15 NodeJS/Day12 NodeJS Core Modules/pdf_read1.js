const fs = require('fs');
const pdf = require('pdf-parse');

async function readPdf(filePath) {
    try {
        // 1. Read the file into a buffer
        const dataBuffer = fs.readFileSync(filePath);

        // 2. Parse the buffer
        const data = await pdf(dataBuffer);

        // 3. Access the data
        console.log(`Number of pages: ${data.numpages}`);
        console.log(`Info: ${JSON.stringify(data.info)}`);
        
        console.log("\n--- PDF Content ---");
        console.log(data.text); 
        
    } catch (error) {
        console.error("Error reading PDF:", error);
    }
}

readPdf('JS Array Methods.pdf');