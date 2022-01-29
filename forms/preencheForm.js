const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs').promises;

const conferirDados = (pDados)=>
{
  var novoDado = Object.entries(pDados)
    console.log('<pDados>')
    console.log(novoDado);
    console.log('<pDados>')

    const baseURL = 'https://www.uscis.gov/sites/default/files/document/forms/';

    const paraCada = (pDados)=> 
    {
        var result = [];
        for (var i=0; i < pDados.length; i++){
            result.push(pDados.value);
      }
    }
}

async function preenchePDF(formArquivo, dados, formSaida) {
//#region preenchePDF(params)
//  formArquivo = formulário a ser preenchido,
//  dados = informações dados pelo usuário,
//  formSaida = formulário preenchido
//#endregion
    try {
        const pdfDoc = await PDFDocument.load(await readFile(formArquivo));

        const form = pdfDoc.getForm();

        form.getTextField('Text2').setText('John Smith');

        form.getCheckBox('Check Box7').check();

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);
        console.log('PDF created!');
    } catch (err) {
    console.log(err);
    }
}

module.exports = { preenchePDF , conferirDados }

//#region exemplo:
// createPdf('medical-claim-form_unlocked.pdf', 'output.pdf');

/*

    // Modify doc, fill out the form...
    const fieldNames = pdfDoc
      .getForm()
      .getFields()
      .map((f) => f.getName());
    console.log({ fieldNames });

    const possibleFields = Array.from({ length: 111 }, (_, i) => i);
    possibleFields.forEach((possibleField) => {
      try {
        form
          .getTextField(`Text${possibleField}`)
          .setText(possibleField.toString());
      } catch (error) {
        // console.error(error);
      }
    });

    pdfDoc.removePage(0);
    pdfDoc.removePage(1);
    pdfDoc.removePage(1);
    pdfDoc.removePage(1);
    pdfDoc.removePage(1);
*/
//#endregion