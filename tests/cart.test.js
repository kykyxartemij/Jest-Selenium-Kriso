const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
require('chromedriver')

let driver; 
const TIMEOUT = 10000;
let basketSumOfTwo = 0; 

describe('Shopping cart workflow', () => {

  //use beforeAll when you need action before ALL tests
  //use beforeEach when you need action before EACH test

  beforeAll( async () => {
    driver = await new Builder().forBrowser('chrome')
    //uncomment if you want to run in headless mode
    .setChromeOptions(new chrome.Options().addArguments('--headless'))
    .build()
    await driver.manage().window().maximize()
    await driver.manage().setTimeouts({ implicit: TIMEOUT })
    await driver.get('https://www.kriso.ee/')
  });
  
  afterAll( async () => {
    //uncomment if you want to close the browser in the end
    await driver.quit()
  });
  
  test('Test logo element is visible', async () => {
    const logo = await driver.findElement(By.className('icon-kriso-logo'))
    expect(logo).toBeDefined()
  });

  test('Test add first item to shopping cart', async () => {
    const bookLinks = await driver.findElements(By.className('book-img-link'))
    await bookLinks[0].click()

    await driver.findElement(By.id('btn_addtocart')).click()

    const cartText = await driver.findElement(By.css('.item-messagebox')).getText()
    expect(cartText).toContain('Toode lisati ostukorvi')
  });

  test('Test continue shopping', async () => {
    await driver.findElement(By.className('cartbtn-event back')).click()
    await driver.findElement(By.className('icon-kriso-logo')).click()
  });

  test('Test add second item to shopping cart', async () => {
    const bookLinks = await driver.findElements(By.className('book-img-link'))
    await bookLinks[1].click()

    await driver.findElement(By.id('btn_addtocart')).click()

    const cartText = await driver.findElement(By.css('.item-messagebox')).getText()
    expect(cartText).toContain('Toode lisati ostukorvi')
  });

  test('Test verify cart has two items', async () => {
    await driver.findElement(By.className('cartbtn-event forward')).click()

    const cartQuantity = await driver.findElement(By.css('.order-qty > .o-value')).getText()
    expect(cartQuantity).toContain("2")
  });

  test('Test verify cart has correct sum of two', async () => {
    const cartItems = await driver.findElements(By.css('.tbl-row > .subtotal'))

    for(let item of cartItems) {
      basketSumOfTwo += parseFloat((await item.getText()).replace(/€/g, ""));
    }  

    let basketSum = await driver.findElement(By.css('.order-total > .o-value')).getText()
    const basketSumNum = parseFloat(basketSum.replace(/€/g,""))
        
    expect(basketSumNum).toBe(basketSumOfTwo);
  });

  test('Test remove one item from the shopping cart', async () => {
    const cartItems = await driver.findElements(By.css('.tbl-row'))
    await cartItems[0].findElement(By.css('.remove')).click();

    const cartQuantity = await driver.findElement(By.css('.order-qty > .o-value')).getText()
    expect(cartQuantity).toContain("1")
  });

  test('Test verify cart has correct sum of one', async () => {
    const cartItems = await driver.findElements(By.css('.tbl-row > .subtotal'))

    let itemsSum = 0;
    for(let item of cartItems) {
        itemsSum += parseFloat((await item.getText()).replace(/€/g, ""));
    }  

    let basketSum = await driver.findElement(By.css('.order-total > .o-value')).getText()
    const basketSumNum = parseFloat(basketSum.replace(/€/g,""))
        
    expect(basketSumNum).toBe(itemsSum)
    expect(basketSumNum).toBeLessThan(basketSumOfTwo)
  });

});