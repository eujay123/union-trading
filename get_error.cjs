const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5175');
  
  // Click the Pedir Cotação button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Pedir Cotação'));
    if (btn) btn.click();
  });

  await new Promise(r => setTimeout(r, 1000));
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('PAGE TEXT AFTER CLICK:', text);
  
  await browser.close();
})();
