const { test, chromium } = require('@playwright/test');

test('Browser, Context, Page demo', async () => {

  // 1️⃣ Launch ONE browser
  const browser = await chromium.launch({ headless: false });

  // 2️⃣ Create FIRST context (User 1)
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();

  await page1.goto('https://signup.live.com/signup?sru=https%3a%2f%2flogin.live.com%2foauth20_authorize.srf%3flc%3d1033%26client_id%3d51483342-085c-4d86-bf88-cf50c7252078%26cobrandid%3ded5d1924-9524-4e70-8f68-5ee5e35afbef%26mkt%3dEN-US%26opid%3d11BB168F6C67DC55%26opidt%3d1767329906%26uaid%3d019b7d1228de733e91f1c9cfd04fa45f%26contextid%3d6FAF390005EB1D4F%26opignore%3d1&mkt=EN-US&uiflavor=web&lw=1&fl=easi2&cobrandid=ed5d1924-9524-4e70-8f68-5ee5e35afbef&client_id=51483342-085c-4d86-bf88-cf50c7252078&uaid=019b7d1228de733e91f1c9cfd04fa45f&suc=c44b4083-3bb0-49c1-b47d-974e53cbdf3c&fluent=2&lic=1');
  console.log('User 1 - Page 1 opened');

  // Open another tab for SAME user (same context)
  const page2 = await context1.newPage();
  await page2.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('User 1 - Page 2 opened (same session)');

  // 3️⃣ Create SECOND context (User 2)
  const context2 = await browser.newContext();
  const page3 = await context2.newPage();

  await page3.goto('https://www.youtube.com/');
  console.log('User 2 - Page opened (different session)');

  // Keep browser open for 10 seconds so you can see it
  await page1.waitForTimeout(10000);

  await browser.close();
});
