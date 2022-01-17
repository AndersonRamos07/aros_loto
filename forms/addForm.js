const puppeteer = require('puppeteer');

const add = async (form, dados) => {

  //#region TAB
  const tab = async (qtd)=>{
    var i = 0;
    do{ i++; await page.keyboard.press('Tab');
    } while (i < qtd);
  }
  //#endregion

  //#region NOVA_PAGINA
  const browser = await puppeteer.launch({ headless: false, slowMo: 150, args:[
    '--start-maximized' // you can also use '--start-fullscreen'
 ]});
  const page = await browser.newPage();
  console.log(dados);
  await page.goto(`https://www.uscis.gov/sites/default/files/document/forms/${form}.pdf`);
  page.waitForNavigation();

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

  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.type('G-1145_' + dados.firstName + '.pdf');
  await tab(2);
  await page.keyboard.press('Enter');
};
//#endregion

const confirm = async (dados) =>{
  
}

module.exports = { add }
