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

    const headingSelector = "my-web-component >>> #heading";
    const heading = await page.$(headingSelector);
    let headingValue = await page.evaluate(el => el.innerText, heading);
    test("Hello, World!", headingValue);

    await page.screenshot({ path: "tests/screenshots/do-something-mid.png" });

    const input = await page.type("my-web-component >>> #inputField", "Test Engineer says:");
    await page.evaluate(() => { document.querySelector('my-web-component').talkToMe("Hello, Beautiful!"); })
    headingValue = await page.evaluate(el => el.innerText, heading);
    test("Test Engineer says: Hello, Beautiful!", headingValue);

    await page.screenshot({ path: "tests/screenshots/do-something-final.png" });

    await browser.close();
})();

function test(expected, actual) {
    console.assert(expected === actual, `Expected "${expected}", but got "${actual}"`);
}