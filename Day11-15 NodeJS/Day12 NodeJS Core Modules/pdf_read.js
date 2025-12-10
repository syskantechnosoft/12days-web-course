const fs = require('fs');
const pdf = require('pdf-parse');

async function extractTextFromPdf(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text; // This contains the extracted text
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        return null;
    }
}

async function processPdfText(pdfPath) {
    const extractedText = await extractTextFromPdf(pdfPath);

    if (extractedText) {
        // Example formatting: converting to uppercase
        const uppercaseText = extractedText.toUpperCase();
        console.log('Uppercase text:\n', uppercaseText);

        // Example formatting: splitting into lines
        const lines = extractedText.split('\n');
        console.log('\nText split into lines:');
        lines.forEach((line, index) => {
            console.log(`Line ${index + 1}: ${line}`);
        });

        // Further formatting can include:
        // - Removing extra whitespace
        // - Searching for specific patterns (regex)
        // - Structuring data into objects or arrays
        // - Saving to a new text file using fs.writeFileSync
    }
}

// Usage example:
processPdfText('JS Array Methods.pdf');