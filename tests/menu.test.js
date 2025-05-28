const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Homepage = require('../pageobjects/homePage');
require('chromedriver');

let driver;
const TIMEOUT = 30000;

describe('Search products by filter menu', () => {
    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();

        await driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: TIMEOUT });
        homepage = new Homepage(driver);
        await homepage.openUrl();
        await homepage.acceptCookies();
    }, TIMEOUT); 

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Filter books by category', async () => {
        const categoryLinkLocator = By.linkText('Muusikaraamatud ja noodid'); 
        const categoryLink = await driver.findElement(categoryLinkLocator);
        await categoryLink.click();

        const resultsLocator = By.css('.book-title'); 
        const results = await driver.findElements(resultsLocator);
        expect(results.length).toBeGreaterThan(0);
    }, TIMEOUT); 

    // Old style of tests
    test('Filter books by subcategory', async () => {
        await homepage.applyFormatFilter('Kõvakaaneline');
        const filteredResults = await homepage.getSearchResultsText();
        expect(filteredResults.length).toBeGreaterThan(0);
    }, TIMEOUT);

    test('Combine filters for category and subcategory', async () => {
        await homepage.applyLanguageFilter('English');
        await homepage.applyFormatFilter('Kõvakaaneline');
        const filteredResults = await homepage.getSearchResultsText();
        expect(filteredResults.length).toBeGreaterThan(0);
    }, TIMEOUT);

    test('Verify no results for invalid filter combination', async () => {
        await homepage.applyLanguageFilter('NonexistentLanguage');
        const filteredResults = await homepage.getSearchResultsText();
        expect(filteredResults.length).toBe(0);
    }, TIMEOUT);
});