const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Homepage = require('../pageobjects/homePage');
require('chromedriver');

let driver;
const TIMEOUT = 30000;

describe('Search products by keywords', () => {
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

    test('Search for "harry potter" returns results', async () => {
        const searchInputLocator = By.id('top-search-text'); 
        const searchButtonLocator = By.css('.btn-search'); 

        const searchInput = await driver.findElement(searchInputLocator);
        await searchInput.sendKeys('harry potter');
        const searchButton = await driver.findElement(searchButtonLocator);
        await searchButton.click();

        const resultsLocator = By.css('.book-title'); 
        const results = await driver.findElements(resultsLocator);
        expect(results.length).toBeGreaterThan(0);
    }, TIMEOUT);

    // Old style of tests
    test('All items contain keyword in title or description', async () => {
        const keyword = 'harry potter';
        await homepage.searchFor(keyword);
        await homepage.verifySearchResultsContainKeyword(keyword);
    }, TIMEOUT);

    test('Sort results by price ascending', async () => {
        await homepage.sortResultsBy('price-asc');
        const sortedResults = await homepage.getSearchResultsText();
        expect(sortedResults.length).toBeGreaterThan(0);
    }, TIMEOUT);

    test('Filter results by language "English"', async () => {
        await homepage.applyLanguageFilter('English');
        const filteredResults = await homepage.getSearchResultsText();
        expect(filteredResults.length).toBeGreaterThan(0);
    }, TIMEOUT);

    test('Filter results by format "Kõvakaaneline"', async () => {
        await homepage.applyFormatFilter('Kõvakaaneline');
        const filteredResults = await homepage.getSearchResultsText();
        expect(filteredResults.length).toBeGreaterThan(0);
    }, TIMEOUT);
});