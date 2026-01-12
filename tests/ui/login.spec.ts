import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';

test.describe('Swag Labs Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });


  /*
    Verify login with correct credentials.
    Essential because the website requires user authentication
    in order to access protected website functions.
  */
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');

    // Expect URL to contain inventory.html
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  /*
    Verify invalid user data.
    Essential to prevent unauthorized access for invalid users and to display error information.
  */
  test('should show error on invalid login', async ({ page }) => {
    await page.fill('input[data-test="username"]', 'invalid_user');
    await page.fill('input[data-test="password"]', 'wrong_password');
    await page.click('input[data-test="login-button"]');

    const error = page.locator('h3[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface');
  });



  /*
    Verify that login is not possible when the username or password is missing.
    Essential to reduce unnecessary backend requests that would fail due to missing input data.
  */
  test('should prevent login with empty username or password', async ({ page }) => {
    // empty username
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');

    let error = page.locator('h3[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Username is required');

    // reload page for next test
    await page.reload();

    // empty password
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.click('input[data-test="login-button"]');

    error = page.locator('h3[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Password is required');
  });


  /*
      Verify that the site does not allow a locked-out user to log in.
      It is essential to ensure that a locked-out user cannot access the website.
  */
  test('should not allow login for locked out user', async ({ page }) => {
    await page.fill('input[data-test="username"]', 'locked_out_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');

    const error = page.locator('h3[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Sorry, this user has been locked out');
  });



    /*
      Verify password security.
      Essential to ensure the password is protected from unauthorized access.
     */
  test('should mask password input', async ({ page }) => {
    const passwordInput = page.locator('input[data-test="password"]');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  
    /*
        Verify the logout function.
        It is essential to ensure that the user can log out of the page after logging in.
    */
  test('should logout successfully', async ({ page }) => {
    // login
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory.html/);

    // open menu and logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL(URL);
  });

});
