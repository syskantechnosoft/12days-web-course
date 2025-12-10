const Tesseract = require('tesseract.js');

async function readScannedPdf(imagePath) {
    try {
        console.log("Processing... this may take a moment.");
        
        // Recognize text from the image/PDF
        const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'eng', // Language code
            { logger: m => console.log(m) } // Optional: log progress
        );

        console.log("\n--- Extracted Text ---");
        console.log(text);
        
    } catch (error) {
        console.error("OCR Error:", error);
    }
}

// Note: Tesseract works best with image files converted from PDF, 
// but can handle some PDF streams depending on configuration.
readScannedPdf('JS Array Methods.pdf');