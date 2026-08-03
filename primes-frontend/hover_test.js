const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('BROWSER:', msg.text());
  });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log('Page loaded successfully');
    
    // Find the chart and hover over it
    await page.waitForSelector('.recharts-responsive-container');
    const chart = await page.$('.recharts-responsive-container');
    const boundingBox = await chart.boundingBox();
    
    if (boundingBox) {
       console.log('Hovering over chart at', boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
       await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
       // Wait a bit to let React process the hover and log
       await page.waitForTimeout(1000);
       
       // Hover over right side
       await page.mouse.move(boundingBox.x + boundingBox.width - 50, boundingBox.y + boundingBox.height / 2);
       await page.waitForTimeout(1000);
    } else {
       console.log('Chart not found or has 0 size');
    }
    
  } catch (e) {
    console.log('Nav error:', e);
  }
  
  await browser.close();
})();
