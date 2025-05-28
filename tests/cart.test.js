const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
let Homepage = require('../pageobjects/homePage');
let Cartpage = require('../pageobjects/cartPage');

require('chromedriver');

let driver;
const TIMEOUT = 30000;
let cartSumOfOne = 0;
let cartSumOfTwo = 0;

describe('Shopping cart workflow', () => {
    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();

        await driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: TIMEOUT });

        Homepage = new Homepage(driver);
        await Homepage.openUrl();
        await Homepage.acceptCookies();
    }, TIMEOUT);

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Verify logo element is visible', async () => {
        await Homepage.verifyLogo();
    }, TIMEOUT);

    test('Add first item to shopping cart', async () => {
        const firstBookLocator = By.css('.book-img-overlay a'); 
        const addToCartButtonLocator = By.css('.btn-addtocart'); 

        const firstBook = await driver.findElement(firstBookLocator);
        await firstBook.click();

        const addToCartButton = await driver.findElement(addToCartButtonLocator);
        await addToCartButton.click();

        const cartMessageLocator = By.css('#cart-message'); 
        const cartMessage = await driver.findElement(cartMessageLocator);
        const messageText = await cartMessage.getText();
        expect(messageText).toContain('Toode lisati ostukorvi');
    }, TIMEOUT);

    // Old style of tests 
    test('Continue shopping after adding first item', async () => {
        await Homepage.continueShopping();
    }, TIMEOUT);

    test('Add second item to shopping cart', async () => {
        await Homepage.openBookPage(2);
        await Homepage.addItemToShoppingCart();
        await Homepage.verifyItemAddedToCart();
    }, TIMEOUT);

    test('Verify cart contains two items', async () => {
        Cartpage = await Homepage.openShoppingCart();
        await Cartpage.verifyCartQuantity(2);
    }, TIMEOUT);

    test('Verify total sum of two items in cart', async () => {
        const cartTotalLocator = 'span.cart-total'; 
        cartSumOfTwo = await Cartpage.verifyCartSumIsCorrect(cartTotalLocator);
    }, TIMEOUT);

    test('Remove one item from shopping cart', async () => {
        const removeButtonLocator = 'button.remove-item'; 
        await Cartpage.removeItemFromCart(removeButtonLocator, 1);
        const cartQuantityLocator = 'span.cart-quantity'; 
        await Cartpage.verifyCartQuantity(cartQuantityLocator, 1);
    }, TIMEOUT);

    test('Verify total sum after removing one item', async () => {
        const cartTotalLocator = 'span.cart-total'; 
        cartSumOfOne = await Cartpage.verifyCartSumIsCorrect(cartTotalLocator);
        expect(cartSumOfOne).toBeLessThan(cartSumOfTwo);
    }, TIMEOUT);

    test('Verify cart is empty after removing all items', async () => {
        const removeButtonLocator = 'button.remove-item'; 
        await Cartpage.removeItemFromCart(removeButtonLocator, 1);
        const cartQuantityLocator = 'span.cart-quantity'; 
        await Cartpage.verifyCartQuantity(cartQuantityLocator, 0);
    }, TIMEOUT);
});