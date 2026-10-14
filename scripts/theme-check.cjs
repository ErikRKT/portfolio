// Run: node scripts/theme-check.cjs <path-to-playwright> [site-url]
const { chromium } = require(process.argv[2] || 'playwright');
const url = process.argv[3] || 'http://127.0.0.1:5174';
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url);
      await page.locator('.theme-toggle').waitFor();
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(`Overflow at ${width}`);
      if (await page.locator('.theme-toggle').getAttribute('aria-pressed') !== 'true') throw Error('System dark preference');
      await page.locator('.theme-toggle').click();
      await page.reload();
      if (await page.locator('.theme-toggle').getAttribute('aria-pressed') !== 'false') throw Error('Saved light preference');
      await page.locator('.theme-toggle').click();
      if (width < 900) {
        await page.locator('#menu-toggle').click();
        await page.keyboard.press('Escape');
        if (await page.locator('#menu-toggle').getAttribute('aria-expanded') !== 'false') throw Error('Menu Escape');
      }
    }
    await page.goto(`${url}/en/`);
    if (await page.locator('.theme-toggle').getAttribute('aria-label') !== 'Dark mode') throw Error('English label');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    if (await page.locator('.hero h1 span').first().evaluate(el => getComputedStyle(el).animationName) !== 'none') throw Error('Reduced motion');
    await page.screenshot({ path: 'theme-desktop.png' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'theme-mobile.png' });
    if (errors.length) throw Error(errors.join('\n'));
    console.log('PASS: theme, persistence, PT/EN, 390/768/1440 layout, menu Escape, reduced motion; no page errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
