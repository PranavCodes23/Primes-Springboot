const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log('Page loaded successfully');
    
    // Check if BookingStatistics graph exists
    const hasGraph = await page.evaluate(() => {
      const el = document.querySelector('.recharts-responsive-container');
      return el ? el.innerHTML.includes('recharts-surface') : false;
    });
    
    console.log('Graph rendered:', hasGraph);
    
    if (!hasGraph) {
      // Print inner html of right col
      const html = await page.evaluate(() => {
        const cols = document.querySelectorAll('div');
        for (let col of cols) {
          if (col.className.includes('rightCol')) {
            return col.innerHTML;
          }
        }
        return 'rightCol not found';
      });
      console.log('Right col HTML:', html);
    }
  } catch (e) {
    console.log('Nav error:', e);
  }
  
  await browser.close();
})();
