const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');

// start
(async () => {
  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,


    executablePath: '/usr/bin/firefox',
    userDataDir: '/share/firefox',

    slowMo: true,
  });
  const page = await browser.newPage();

  await page.goto('https://poe.com/ChatGPT');
  await page.screenshot({ path: '/share/chatgpt.png', });

  // NOTE: clear chat history
  // ChatBreakButton_button__
  await page.waitForSelector('textarea[placeholder="Talk to ChatGPT on Poe"]');
  await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', "start a new chat", { delay: 50 });
  await page.waitForSelector('[class*="sendButton"]');
  await page?.evaluate(() => {
    document.querySelector('[class*="sendButton"]').click();
  });

  await page.waitForSelector('[class*="ChatBreakButton_button__"]', { waitUntil: "networkidle0", });
  await page.waitForSelector('[class*="Message_botMessageBubble__"]', { waitUntil: "networkidle0", });
  await page.waitForTimeout(3 * 1000);
  await page?.evaluate(() => {
    document.querySelector('[class*="ChatBreakButton_button__"]').click();
    // clear all bubble
    document.querySelectorAll('[class*="Message_botMessageBubble__"]').forEach(item => item.remove())
  });

  // NOTE: clear context

  await page.waitForTimeout(3 * 1000);

  // await page.waitForSelector('textarea[placeholder="Talk to ChatGPT on Poe"]')
  await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', "say 'hello 1' to me", { delay: 100 });

  await page.waitForSelector('[class*="sendButton"]')
  await page?.evaluate(() => {
    document.querySelector('[class*="sendButton"]').click()
  })


  // NOTE: wait for reply
  await page.waitForSelector('[class*="Message_botMessageBubble__"]',
    { waitUntil: "networkidle0", });
  await page.waitForTimeout(1 * 1000);

  var reply = '...';

  await page.waitForSelector('[class*="Message_botMessageBubble__"]',
    { waitUntil: "networkidle0", });

  for (var countdown = 10; countdown > 0; countdown--) {
    reply = await page.evaluate(() => {
      return document.querySelector('[class*="Message_botMessageBubble__"]').textContent;
    });

    if (countdown > 0 && reply.trim() == '...') {
      // NOTE: continue to wait
      console.log({ countdown, reply });
      await page.waitForTimeout(1 * 1000);
    } else {
      break
    }
  }

  console.log(reply)



  await page.waitForTimeout(9999 * 1000);

  await page.close();
  await browser.close();
})();
