const assert = require("assert");
const puppeteer = require("puppeteer");

let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      "--disable-dev-shm-usage",
    ],
  });

  const browserVersion = await browser.version();
  console.log(`Started ${browserVersion}`);
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

after(async () => {
  await browser.close();
});

describe(
  "react_host_admin helloworld",
  () => {
    it("renders", async () => {
      const response = await page.goto("http://localhost:3000/");
      assert(response.ok());
      await page.screenshot({ path: `screenshots/react_host_admin/app.png` });
    });
  },
  30 * 1000
);
