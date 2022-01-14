const puppeteer = require('puppeteer');

const add = async (form, dados) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 150, args: ['--window-size=1366,720',] });
  const page = await browser.newPage();
  console.log(dados);
  await page.goto('https://www.uscis.gov/sites/default/files/document/forms/g-1145.pdf');
  page.waitForNavigation();

  var i = 0;
  do{
    i++;
    await page.keyboard.press('Tab');
  } while (i < 14);

  await page.keyboard.type(dados.lastName);
  await page.keyboard.press('Tab');
  await page.keyboard.type(dados.firstName);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.type(dados.email);
  await page.keyboard.press('Tab');
  await page.keyboard.type(dados.phone);
  await page.keyboard.press('Tab');

  const nomePDF = dados.firstName + '.pdf'

  console.log(nomePDF + ' - <nomePDF>')

  await page.emulateMediaType('screen');

  await page.pdf({ path: nomePDF });

  await browser.close();

};

module.exports = { add }
