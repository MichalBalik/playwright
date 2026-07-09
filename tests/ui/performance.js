const {expect} = require('@playwright/test');
module.exports = {playwrightPerformance}

async function playwrightPerformance(page){
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', {name:'Get started'}).click();
    await expect(page).toHaveURL('https://playwright.dev/docs/intro')


}