try {
  await page.waitForSelector('.foo');
} catch (e) {
  if (e instanceof puppeteer.errors.TimeoutError) {
    // Do something if this is a timeout.
  }
}
