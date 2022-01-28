const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const dividirInfos = (objetos) =>{
  var agora = objetos.lastName.length;
  var dados = [];

  for(var i=0; i < agora; i++){
    let dadosForm =
    {
      "lastName": objetos.lastName[i],
      "firstName": objetos.firstName[i],
      "email": objetos.email[i],
      "phone": objetos.phone[i]
    }
  dados.push(dadosForm);
  }
  console.table(dados);
  return console.log(dados + '\n' + '<return dados>');
}

//#region NOVA_PAGINA
const newPage = async (form, dados) =>{
  const urlPage = `https://www.uscis.gov/sites/default/files/document/forms/${form}.pdf`;

  const browser = await puppeteer.launch({ dumpio: true, waitUntil: "networkidle0", headless: false, slowMo: 150, args:[
    '--start-maximized'//, `--load-extension=pdfjs-dist/build/pdf.worker` // you can also use '--start-fullscreen'
  ]});
  const page = await browser.newPage();
  await page.goto(urlPage);
  page.waitForNavigation();


  //#region TAB
  const tab = async (qtd)=>{
    var i = 0;
    do{ i++; await page.keyboard.press('Tab');
    } while (i < qtd);
  }
  //#endregion

  //const page = await newPage(form);
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

  //await page.emulateMediaType('print');

  const arquivoPDF = await page.pdf({
    path: path.join(__dirname, 'g-aros.pdf'),
    format: 'A4'
  })

  await browser.close();

  //#region
  
  /*await page.evaluate((href) => {
    href = page.url();
    var body = document.getElementsByTagName('body');
    var alink = document.createElement('a');
    var texto = document.createTextNode('Clique aqui');
    alink.setAttribute('href', href);
    alink.setAttribute('download', '');
    alink.className('forCLick');
    alink.appendChild(texto);
    body.appendChild(alink);
  })
  page.waitForNavigation();

  await page.waitForSelector('body > a');

  await page.click('body > a');

  console.log('deve ter ido...');
*/


  /*const image = await page.evaluate(function() {
    return document.querySelector('body > embed');
  });*/
  //await page.$eval('body > embed', e => e.setAttribute("download", ''))


  /*page.on('request', requisicao =>{
    const file = fs.createWriteStream('../file.pdf');
    http.get(requisicao.url(), response => response.pipe(file));
  });*/

  //#endregion

  return arquivoPDF;
}
//#endregion

/*
const add = async (dados) => {

  const page = newPage();

  //#region TAB
  const tab = async (qtd)=>{
    var i = 0;
    do{ i++; await page.keyboard.press('Tab');
    } while (i < qtd);
  }
  //#endregion

  //const page = await newPage(form);
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

  /*
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
  */
 // await page.close();
/*
  return restpdf;

};
*/
/*
const salvar = () =>{
const arquivo = fs.createWriteStream("arquivo.pdf");
const request = https.get(urlPage, function(response) {
  try{
    response.pipe(arquivo);
    response.on()
    console.table(arquivo);
  }
  catch(err){
    console.log(err)
  }
  finally{
    console.info('Deu certo!');
  }
});
return request
}

const pdfLido = async () =>{
  const pdfTodo = await salvar();

  const tudo = await PDFDocument.load(pdfTodo);

  console.log(tudo)
}
*/

module.exports = { newPage , dividirInfos /*, add , preencherForm , salvar , pdfLido */ }