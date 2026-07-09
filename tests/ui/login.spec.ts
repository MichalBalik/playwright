import test, { expect } from '../../fixtures/basePages'
//import { LoginPage } from '../page-objects/LoginPage';



test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
  })

  /*
    Verify login with correct credentials.
    Essential because the website requires user authentication
    in order to access protected website functions.
  */

const users = [
  {
    username: "standard_user",
    expected: "success",
  },
    {
    username: "problem_user",
    expected: "success",
  },
      {
    username: "performance_glitch_user",
    expected: "success",
  },
  {
    username: "locked_out_user",
    expected: "error",
    errorMessage:"Epic sadface: Sorry, this user has been locked out.",
  },
];


for (const user of users) {
  test(`${user.username}`, async ({ page,loginPage }) => {
    await loginPage.loginUser( user.username, "secret_sauce");

    if (user.expected === "success") {
      await expect(page).toHaveURL(/inventory/);
    } else if(user.expected =="error" ) {
      await expect(page.locator('[data-test="error"]')).toHaveText(user.errorMessage!);
    }
  });
}


  test('Successfull login', async ({ page, loginPage,browserName }) => {

    test.skip(browserName === 'firefox','Still working on it.');
    await loginPage.login();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  });

  /*
    Verify invalid user data.
    Essential to prevent unauthorized access for invalid users and to display error information.
  */
  test('Cannot login with valid username and invalid password', async ({ page, loginPage }) => {

    test.info().annotations.push({
      type: 'Test',
      description: 'This test will pass if the user is not able to login with valid username and invalid pasword'
    })
    await test.step('Enter valid username', async () => {
      await loginPage.enterValidUsername();
    })

    await test.step('Enter invalid password', async () => {
      await loginPage.enterInvalidPassword();
    })
    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    })

    await test.step('Verify invalid credentials error message', async () => {
      await expect(loginPage.invalidCredentialsErrorMessage, 'Can not find login error message.').toBeVisible();
    })






  });
  /*
    Verify invalid user data.
    Essential to prevent unauthorized access for invalid users and to display error information.
  */
  test('Cannot login with invalid username and valid password @slow', async ({ page, loginPage }) => {


    await loginPage.enterInvalidUsername();
    await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
  });


  /*
    Verify that login is not possible when the username or password is missing.
    Essential to reduce unnecessary backend requests that would fail due to missing input data.
  */
  test('Cannot login with blank fields', async ({ page, loginPage }) => {


    await loginPage.clickLoginButton();
    await expect(loginPage.requieredCredentialsErrorMessage).toBeVisible();
  });
  /*
      Verify that the site does not allow a locked-out user to log in.
      It is essential to ensure that a locked-out user cannot access the website.
  */
  test('Cannot login with locked out user', async ({ page, loginPage }) => {


    await loginPage.enterLockerOutUser();
    await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.lockedOutErrorMessage).toBeVisible();
  });

    /*
      Verify password security.
      Essential to ensure the password is protected from unauthorized access.
     */
test('Password should be masked', async ({ page, loginPage }) => {


    await expect(loginPage.passwordInput).toHaveAttribute('type','password');
    
  });


})

