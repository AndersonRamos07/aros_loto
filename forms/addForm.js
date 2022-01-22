const puppeteer = require('puppeteer');

//#region NOVA_PAGINA
const newPage = async (form) =>{
  const browser = await puppeteer.launch({ headless: false, slowMo: 150, args:[
    '--start-maximized' // you can also use '--start-fullscreen'
 ]});
  const page = await browser.newPage();
  await page.goto(`https://www.uscis.gov/sites/default/files/document/forms/${form}.pdf`);
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
  await tab(16);
};

const confirm = async (dados) =>{
  
}

module.exports = { add }

/*
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.type('G-1145_' + dados.firstName + '.pdf');
  await tab(2);
  await page.keyboard.press('Enter');
*/
