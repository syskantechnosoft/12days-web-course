const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

pdfParser.on("pdfParser_dataReady", pdfData => {
    // This returns the raw JSON structure of the PDF
    // Great for mapping specific fields in a form
    console.log(JSON.stringify(pdfData)); 
    
    // To get raw text content similar to pdf-parse:
    // console.log(pdfParser.getRawTextContent());
});

pdfParser.loadPDF("./JS Array Methods.pdf");