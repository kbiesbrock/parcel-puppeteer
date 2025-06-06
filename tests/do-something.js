import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    // await page.evaluate(() => { debugger; }); // For debugging purposes

    await page.goto("http://localhost:1234/");
    await page.setViewport({ width: 300, height: 200 });
    
    await page.screenshot({ path: "tests/screenshots/do-something-start.png" });

    const submitButtonSelector = "#submitButton";
    await page.waitForSelector(submitButtonSelector);
    await page.click(submitButtonSelector);

    const headingSelector = await page.waitForSelector("#heading");
    const headingValue = await headingSelector?.evaluate(el => el.textContent.trim());

    await page.screenshot({ path: "tests/screenshots/do-something-final.png" });

    const expectedValue = "Hello, World!";
    console.assert(headingValue === expectedValue, `Expected "${expectedValue}", but got "${headingValue}"`);

    console.log("Heading:", headingValue);

    await browser.close();
})();
