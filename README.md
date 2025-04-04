# Selenium & Jest Test Automation – Kriso.ee Webshop (Part I & II)

Your task is to create automated tests for the [Kriso.ee](https://www.kriso.ee/) bookshop based on the described test cases below.

## 🚀 How to Get Started

1. **Fork** this repository into your own GitHub account  
2. **Clone** the forked repository to your local machine:  
   ```bash
   git clone <your-repo-url>
   ```
3. **Install dependencies** with:  
   ```bash
   npm install
   ```
4. **Write tests** based on the test case descriptions below  
5. **Run tests** locally to confirm they pass:  
   ```bash
   npm test
   ```
   or  
   ```bash
   npx jest
   ```
6. **Commit** your changes  
7. **Create a Pull Request** back to the original repository  
8. ✅ You will be graded if:
   - Tests are completed
   - Page Object Pattern is followed

---

## ✅ Test Cases

### 🔍 Search for Books by Keywords

| Steps                                                | Expected Result (Assertions)                                                                       |
|------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Open [https://www.kriso.ee](https://www.kriso.ee)    | Confirm the page has a Kriso title/logo                                                            |
| Search for keyword “harry potter”                    | Confirm multiple products are shown                                                                |
|                                                      | All listed items contain the searched keyword in their title or description                        |
|                                                      | Products can be sorted                                                                             |
| Sort results by price                                | Verify products are sorted in the expected order (e.g., low to high or high to low)                |
| Filter by language (e.g., English)                   | Verify only products in that language appear                                                       |
| Filter by format (e.g., “Kõvakaaneline” / hardback) | Confirm fewer items are listed and all match the selected format                                   |

---

### 🛒 Add Books to Shopping Cart

| Steps                                           | Expected Result (Assertions)                                      |
|------------------------------------------------|-------------------------------------------------------------------|
| Open [https://www.kriso.ee](https://www.kriso.ee) | Confirm the page has a Kriso title/logo                         |
| Search for any keyword                          | Confirm multiple results are shown                               |
|                                                | Products can be added to the shopping cart                       |
| Add one book to the cart                        | Confirm the cart shows 1 item                                    |
| Add a second book                               | Confirm the cart updates to show 2 items                         |
| Click the cart/checkout icon                    | Confirm the user is navigated to the cart view                   |
|                                                | Verify cart contains 2 correct items                             |
|                                                | Verify the total price is accurate                               |
| Remove the first item from cart                 | Confirm the cart now shows 1 item                                |
|                                                | Confirm the correct item was removed                            |
|                                                | Verify the total price updates accordingly                       |

---

### 🧭 Navigate Products via Filters

| Steps                                                    | Expected Result (Assertions)                                          |
|----------------------------------------------------------|------------------------------------------------------------------------|
| Open [https://www.kriso.ee](https://www.kriso.ee)        | Confirm the page has a Kriso title/logo                              |
| Scroll down to find a section like “Muusikaraamatud ja noodid”         | Confirm the section is visible                                       |
| Click the "Õppematerjalid" category               | Verify that there are more than 1 products found              |
|                                                          | Confirm URL or page title reflects navigation correctly              |
| Click on a category ("Bänd ja ansambel")      | Confirm active filters show the selected category                    |
|                                                          | Verify products list now contains less items                              |
| Click on a format category ("CD")      | Confirm active filters show the selected category                    |
|                                                          | Verify products list now contains less items                              |