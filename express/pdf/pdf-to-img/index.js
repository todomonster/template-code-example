//pdf to img
//npm install pdf-to-img
// https://github.com/k-yle/pdf-to-img
//need pdf file

const { pdf } = require("pdf-to-img");
const fs = require("fs");

const outputDirectory = "tmp";
async function pdfToPng() {
    // fileName: 1.png, 2.png, ...
    let counter = 1;
    for await (const image of await pdf("example.pdf", { scale: 3.0 })) {
        //writeFileSync need node v20!
        fs.writeFileSync(`${outputDirectory}/${counter}.png`, image);
        counter++;
    }
}
pdfToPng();