//#region
/*const stdin = process.stdin
    .on('entrada', informe => console.log('hehe', informe.toString()));

const stdout = process.stdout
    .on('saida', informe => console.log('haha', informe.toString()));

stdin.pipe(stdout);
*/

//const stdin = process.stdin
//    .on('data', informe => console.log('hehe', informe.toString()));

//const stdout = process.stdout
//    .on('data', informe => console.log('haha', informe.toString()));

//stdin.pipe(stdout);

/*process.stdin.pipe(process.stdout)
    .on('data', msg => console.log('data terminal', msg.toString()));
    */

    /*
process.stdin.pipe(process.stdout)

    .on('data', msg => console.log('data', msg.toString()))
    .on('error', msg => console.log('error', msg.toString()))
    .on('end', _ => console.log('end'))
    .on('close', _ => console.log('close'))
    */
//#endregion

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile);
(async () => {
  const browser = await puppeteer.launch({ waitUntil: "networkidle0",
    headless: false, slowMo: 150, args:['--start-maximized']})
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 800 })

  //await page.goto('https://www.uscis.gov/sites/default/files/document/forms/g-1145.pdf')
  /*const imageHref = await page.evaluate((sel) => {
    return document.querySelector('body > embed').getAttribute('src')})*/

  const viewSource = await page.goto('https://www.uscis.gov/sites/default/files/document/forms/g-1145.pdf')
  const buffer = await viewSource.buffer()
  await writeFileAsync(path.join(__dirname, 'g-1145AROS.pdf'), buffer)
  console.log('The file was saved!')

  await readFileAsync(path.join(__dirname, 'g-1145AROS.pdf'))
  console.log('The file was read!')
  browser.close()
})()

//#region
/*
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile);
(async () => {
  const browser = await puppeteer.launch({})
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 800 })

  await page.goto('https://checklyhq.com/')
  const imageHref = await page.evaluate((sel) => {
    return document.querySelector(sel).getAttribute('src').replace('/', '')
  }, '.hero-image')

  const viewSource = await page.goto('https://checklyhq.com/' + imageHref)
  const buffer = await viewSource.buffer()
  await writeFileAsync(path.join(__dirname, 'checkly.png'), buffer)
  console.log('The file was saved!')

  await readFileAsync(path.join(__dirname, 'checkly.png'))
  console.log('The file was read!')
  browser.close()
})()
*/
//#endregion