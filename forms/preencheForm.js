const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs').promises;
const path = require('path');

const g1145 = require('./infos/g-1145')
const i131 = require('./infos/i-131')
const i140 = require('./infos/i-140')
const i485 = require('./infos/i-485')
const i765 = require('./infos/i-765')
const eta750b = require('./infos/eta-750b')

const conferirDados = (pDados)=>
{
  var novoDado = Object.entries(pDados);
  var novaChave = Object.keys(pDados);
  var novoValor = Object.values(pDados)

  console.log('<pDados>')
  console.log(novoDado);
  console.log('<pDados>')
  console.log('<novaChave>')
  console.log(novaChave);
  console.log('<novaChave>')
  console.log('<novoValor>')
  console.log(novoValor);
  console.log('<novoValor>')

  const gForm = pDados.nForm[0];
  const gUsuario = pDados.firstName;
  const gOutput = path.join(__dirname +`/saida/${gForm}-${gUsuario}.pdf`);
  const fileRoot = 'G-1145.pdf';

  console.log(gOutput);
  console.log('---------------------------------')

  preenchePDF(fileRoot, pDados, gOutput);
}

async function preenchePDF(formArquivo, dados, formSaida) {
//#region preenchePDF(params)
//  formArquivo = formulário a ser preenchido,
//  dados = informações dados pelo usuário,
//  formSaida = formulário preenchido
//#endregion
  try
  {
    const pdfDoc = await PDFDocument.load(await readFile(formArquivo));

    const nomesDosCampos = pdfDoc
      .getForm()
      .getFields()
      .map((nomes) => nomes.getName());

    const formulario = pdfDoc.getForm();

    console.log('<<<g1145.lastName>>>')
    console.log(g1145.lastName)
    console.log('<<<g1145.lastName>>>')
    console.log('<<<dados.lastName>>>')
    console.log(dados.lastName)
    console.log('<<<dados.lastName>>>')

    formulario.getTextField(g1145.G1145_CAMPOS.lastName).setText(dados.lastName);
    formulario.getTextField(g1145.G1145_CAMPOS.firstName).setText(dados.lastName);
    formulario.getTextField(g1145.G1145_CAMPOS.email).setText(dados.email);
    formulario.getTextField(g1145.G1145_CAMPOS.mobilePhone).setText(dados.phone);


    console.log('<<nomesDosCampos>>');
    console.log(nomesDosCampos);
    console.table(nomesDosCampos);
    console.log('<<{nomesDosCampos}>>');
    console.log({nomesDosCampos});

    //form.getTextField();
    
    const pdfBytes = await pdfDoc.save();
    
    await writeFile(formSaida, pdfBytes);
    
    console.log('PDF created!');
/*
    form.getTextField('Text2').setText('John Smith');

    form.getCheckBox('Check Box7').check();


    */
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