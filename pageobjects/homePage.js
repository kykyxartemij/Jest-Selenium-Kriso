// has everything related to home page
const Page = require('./basePage');
const Cartpage = require('./cartPage');
const { By } = require('selenium-webdriver');

// move all the clicks and element locators here
const homePageUrl = 'https://www.kriso.ee/';

const acceptCookiesBtn = By.className('cc-nb-okagree');
const logoItem = By.className('icon-kriso-logo');
const offerBookLink = By.className('book-img-link');
const addToCartBtn = By.id('btn_addtocart');
const cartMessage = By.css('.item-messagebox');
const cartBackBtn = By.className('cartbtn-event back');
const cartForwardBtn = By.className('cartbtn-event forward');
const searchInput = By.name('query');
const searchButton = By.css('.search-button');
const productItems = By.css('.product-list-item');
const productTitles = By.css('.product-title');
const sortSelect = By.id('sortSelect');
const languageFilterCheckbox = (lang) => By.xpath(`//label[contains(text(),"${lang}")]//input`);
const formatFilterCheckbox = (format) => By.xpath(`//label[contains(text(),"${format}")]//input`);

module.exports = class Homepage extends Page {
    async openUrl() {
        await super.openUrl(homePageUrl);
    }

    async acceptCookies() {
        const cookiesButton = await super.getElement(acceptCookiesBtn);
        if (await cookiesButton.isDisplayed()) {
            await super.findAndClick(acceptCookiesBtn);
        }
    }

    async verifyLogo() {
        const logo = await super.getElement(logoItem);
        const isDisplayed = await logo.isDisplayed();
        expect(isDisplayed).toBe(true); 
    }

    async openBookPage(number) {
        const bookLinks = await super.getElements(offerBookLink);
        if (bookLinks.length >= number) {
            await super.click(bookLinks[number - 1]);
        } else {
            throw new Error(`Book number ${number} does not exist.`);
        }
    }

    async addItemToShoppingCart() {
        const addToCartButton = await super.getElement(addToCartBtn);
        await addToCartButton.click();
    }

    async verifyItemAddedToCart() {
        const messageElement = await super.getElement(cartMessage);
        const messageText = await messageElement.getText();
        expect(messageText).toContain('Toode lisati ostukorvi'); 
    }

    async continueShopping() {
        const backButton = await super.getElement(cartBackBtn);
        await backButton.click();
        const logo = await super.getElement(logoItem);
        await logo.click();
    }

    async openShoppingCart() {
        const forwardButton = await super.getElement(cartForwardBtn);
        await forwardButton.click();
        return new Cartpage(super.getDriver());
    }

    async searchFor(keyword) {
        const searchField = await super.getElement(searchInput);
        await searchField.sendKeys(keyword);
        const searchBtn = await super.getElement(searchButton);
        await searchBtn.click();
    }

    async getSearchResults() {
        return await super.getElements(productItems);
    }

    async getSearchResultsText() {
        const items = await super.getElements(productTitles);
        return Promise.all(items.map(async (item) => await item.getText()));
    }

    async sortResultsBy(option) {
        const sortDropdown = await super.getElement(sortSelect);
        await sortDropdown.sendKeys(option);
    }

    async applyLanguageFilter(language) {
        const checkbox = await super.getElement(languageFilterCheckbox(language));
        if (await checkbox.isDisplayed()) {
            await checkbox.click();
        }
    }

    async applyFormatFilter(format) {
        const checkbox = await super.getElement(formatFilterCheckbox(format));
        if (await checkbox.isDisplayed()) {
            await checkbox.click();
        }
    }

    async verifySearchResultsContainKeyword(keyword) {
        const titles = await this.getSearchResultsText();
        titles.forEach((title) => {
            expect(title.toLowerCase()).toContain(keyword.toLowerCase());
        });
    }
}