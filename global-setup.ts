import {chromium } from "@playwright/test";

async function globalSetup(){
    const browser = await chromium.launch({headless:true}); 
    const page = await browser.newPage();
    await page.goto("http://demoqa.com/login");
    await page.getByPlaceholder('UserName').fill('michalmrkva_admin');
    await page.getByPlaceholder('Password').fill('Michalbalik123@');
    await page.getByRole('button',{name:'Login'}).click();

    //checked logged in
    await page.waitForURL('https://demoqa.com/profile');

    await page.context().storageState({path:'./loginAuth.json'});
    await browser.close();
    

}
export default globalSetup;