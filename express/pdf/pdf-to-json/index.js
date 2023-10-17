//pdf to txt
//npm i pdf2json
//https://github.com/modesty/pdf2json
//need pdf file

import fs from "fs";
import PDFParser from "pdf2json";

const pdfParser = new PDFParser(this, 1);

const fileInput = "./example2.pdf";
const fileName = "./example2.txt";
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile(fileName, pdfParser.getRawTextContent(), () => { console.log("Done."); });
});

pdfParser.loadPDF(fileInput);