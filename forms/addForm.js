const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

const pdf = require('pdf-parser');

const PDFLib = require('pdf-lib');
const PDFDocument = PDFLib.PDFDocument;

/*
const preencherForm = () =>{
const local = __dirname + '/g-1145_thr.pdf';

  const arq = __dirname + `\forms\g-1145.pdf`;

  let dataBuffer = fs.readFileSync(local);
 
 pdf(dataBuffer).then(function(data){
  // number of pages
  console.log(data.numpages);
  // number of rendered pages
  console.log(data.numrender);
  // PDF info
  console.log(data.info);
  // PDF metadata
  console.log(data.metadata); 
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);
  // PDF text
  console.log(data.text);
});

  /*
  const g1145 = fs.readFile(arq, {ArrayBuffer}, (err, data)=>{
    if (err) {
        reject(err); // in the case of error, control flow goes to the catch block with the error occured.
    }
    else{
        resolve(data);  // in the case of success, control flow goes to the then block with the content of the file.
    }
});

  //fs.readFile(__dirname + '/forms/g-1145.pdf');

 // const pdfDoc = await PDFDocument.load(g1145);

  //const form = pdfDoc.getForm();

  //console.log(form);
  //console.table(form);

  //const pdfBytes = await pdfDoc.save();

  //const result = fs.writeFile(__dirname + '/forms/result.pdf', pdfBytes)

};
*/


const urlPage = `https://www.uscis.gov/sites/default/files/document/forms/g-1145.pdf`;

//#region NOVA_PAGINA
const newPage = async (form) =>{

  const browser = await puppeteer.launch({ waitUntil: "networkidle0", headless: true, /*slowMo: 150,*/ args:[
    '--start-maximized' // you can also use '--start-fullscreen'
 ]});
  const page = await browser.newPage();
  await page.goto(urlPage);
  page.waitForNavigation();
  return page;
}
//#endregion

const add = async (form, dados) => {

  //#region TAB
  const tab = async (qtd)=>{
    var i = 0;
    do{ i++; await page.keyboard.press('Tab');
    } while (i < qtd);
  }
  //#endregion

  const page = await newPage(form);
  console.log(dados);

  await page.waitForSelector('body > embed');

  await page.click('body > embed');
  await tab(2);

  await page.keyboard.type(dados.lastName);
  await tab(1)
  await page.keyboard.type(dados.firstName);
  await tab(2)
  await page.keyboard.type(dados.email);
  await tab(1)
  await page.keyboard.type(dados.phone);

  const restpdf = await page.pdf({
    printBackground: true,
    format: "Letter",
    path: "webpage.pdf",
    margin: {
        top: "20px",
        bottom: "40px",
        left: "20px",
        right: "20px"
    }
  });
  await page.close();

  return restpdf;
};

const salvar = () =>{
const arquivo = fs.createWriteStream("arquivo.pdf");
const request = https.get(`https://www.uscis.gov/sites/default/files/document/forms/g-1145.pdf`, function(response) {
  response.pipe(arquivo);
});
return request
}

const pdfLido = async () =>{
  const pdfTodo = await salvar();

  const tudo = await PDFDocument.load(pdfTodo);

  console.log(tudo)
}

module.exports = { add /*, preencherForm*/ , salvar , pdfLido }