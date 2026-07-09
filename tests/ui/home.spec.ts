import test, {expect} from '../../fixtures/basePages';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Home Page', () => {
  test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
  })

test('Verify home title', async ({ page,loginPage,homePage }) => {

  
  await loginPage.login();
  await expect(homePage.title).toBeVisible();
});

test('Verify addToCard functionality', async ({ page,loginPage,homePage }) => {

  
  await loginPage.login();
  await homePage.clickOnAddToCart();
  await expect(homePage.cartBadge).toHaveText("1");

})

test('Verify sucesfull logout', async({page, loginPage,homePage})=>{
  await loginPage.login();
  await homePage.clickOnMenu();
  await homePage.clickOnLogout();
  
  
  await expect(page).toHaveURL('https://www.saucedemo.com/');

})
});