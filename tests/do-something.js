import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    // await page.evaluate(() => { debugger; }); // For debugging purposes

    await page.goto("http://localhost:1234/");
    await page.setViewport({ width: 300, height: 200 });
    
    await page.screenshot({ path: "tests/screenshots/do-something-start.png" });

    const submitButtonSelector = "my-web-component >>> #submitButton";
    await page.waitForSelector(submitButtonSelector);
    const btn = await page.$(submitButtonSelector);
    await btn.click();

    console.log("Button clicked, waiting for heading to update...");

    const headingSelector = "my-web-component >>> #heading";
    const heading = await page.$(headingSelector);
    const headingValue = await page.evaluate(el => el.innerText, heading);

    await page.screenshot({ path: "tests/screenshots/do-something-final.png" });

    const expectedValue = "Hello, World!";
    console.assert(headingValue === expectedValue, `Expected "${expectedValue}", but got "${headingValue}"`);

    console.log("Heading:", headingValue);

    await browser.close();
})();
