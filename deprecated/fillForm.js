const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const preencheF = async () =>{
    const g1145 = __dirname + '/g-1145.pdf';
    console.log(g1145 + ' - <g1145>');

    //const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf'
    //const formPdfBytes = await fetch(g1145).then(res => res.arrayBuffer());
    //const formPdfBytes = await fs.readFileSync(g1145, function (err, data) {
    const formPdfBytes = await fs.readFileSync('g-1145.pdf');

    console.log(formPdfBytes); //.toString('utf-8') + ' - <formPdfBytes>'

    const pdfDoc = await PDFDocument.load(formPdfBytes)
    //console.log(pdfDoc + ' - <pdfDoc>');

    //const form = pdfDoc.getForm()

    //const pdfBytes = await pdfDoc.save()
}
/*
async function fillForm() {
    const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(formPdfBytes)

    const form = pdfDoc.getForm()

    const pdfBytes = await pdfDoc.save()

}
*/
preencheF();