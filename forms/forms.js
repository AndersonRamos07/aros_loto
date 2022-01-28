//import { puppeteer } from 'puppeteer';
const puppeteer = require('puppeteer');

//#region NOVA_PAGINA
const newPage = async (form) =>{
    const urlPage = `https://www.uscis.gov/sites/default/files/document/forms/${form}.pdf`;

    const browser = await puppeteer.launch({ headless: true, slowMo: 150, args:[
      '--start-maximized' // you can also use '--start-fullscreen'
   ]});
    const page = await browser.newPage();
    await page.goto(urlPage);
    page.waitForNavigation();
    return page;
  }

  /*export */const add = async (form, dados) => {
  
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
  
    //await page.close();

  };
  //#endregion

  module.exports = { add }