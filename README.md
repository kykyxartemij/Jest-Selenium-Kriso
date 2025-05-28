# Selenium + Jest Test Automation – Kriso.ee Webshop

## Name: Artemiy Vorozhun
## Group: TA_22V  

---

## Purpose of the Task

Create automated UI tests for the website [https://www.kriso.ee](https://www.kriso.ee) based on the provided test cases using:

- Selenium WebDriver
- Jest
- Page Object Pattern

---

## Implemented Tests

### 1. Search for Books by Keywords (`search.test.js`)

| Action                                         | Result                                                                   |
|-----------------------------------------------|---------------------------------------------------------------------------|
| Open the website and verify the logo          | Timeout in `beforeAll`                                                   |
| Search for the keyword "harry potter"         | Timeout in `beforeAll`                                                   |
| Verify that results are found                 | Timeout in `beforeAll`                                                   |
| Verify that titles contain the keyword        | Timeout in `beforeAll`                                                   |
| Sort results by price                         | Timeout in `beforeAll`                                                   |
| Filter results by language (English)          | Timeout in `beforeAll`                                                   |
| Filter results by format (Kõvakaaneline)      | Timeout in `beforeAll`                                                   |

---

### 2. Add Books to Shopping Cart (`cart.test.js`)

| Action                                         | Result                                                                   |
|-----------------------------------------------|---------------------------------------------------------------------------|
| Verify the logo on the homepage               | Timeout in `beforeAll`                                                   |
| Add the first book to the shopping cart       | Timeout in `beforeAll`                                                   |
| Continue shopping after adding the first book | Timeout in `beforeAll`                                                   |
| Add the second book to the shopping cart      | Timeout in `beforeAll`                                                   |
| Verify that the cart contains two books       | Timeout in `beforeAll`                                                   |
| Verify the total sum of two books             | Timeout in `beforeAll`                                                   |
| Remove one book from the shopping cart        | Timeout in `beforeAll`                                                   |
| Verify the total sum after removing one book  | Timeout in `beforeAll`                                                   |
| Verify that the cart is empty after removing all books | Timeout in `beforeAll`                                                   |

---

### 3. Navigate Products via Filters (`menu.test.js`)

| Action                                         | Result                                                                   |
|-----------------------------------------------|---------------------------------------------------------------------------|
| Navigate to the category “Muusikaraamatud ja noodid” | Timeout in `beforeAll`                                                   |
| Navigate to the subcategory "Õppematerjalid"   | Timeout in `beforeAll`                                                   |
| Apply the filter "Bänd ja ansambel"           | Timeout in `beforeAll`                                                   |
| Apply the format filter "CD"                  | Timeout in `beforeAll`                                                   |
| Verify no results for invalid filter combinations | Timeout in `beforeAll`                                                   |

---

## Installation and Execution

### Install Dependencies
```bash
npm install
```
