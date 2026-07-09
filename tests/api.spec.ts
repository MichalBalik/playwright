import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'

var token = "";

test.describe('API Tests', () => {

    const randomFirstName = faker.person.firstName();
    const randomLastName= faker.person.lastName();
    const randomNumber = faker.number.int(50);

    test.skip("GET request @api", async ({ request }) => {
        const response = await request.get("https://restful-booker.herokuapp.com/booking");
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(JSON.stringify(body));

    });

    test("GET request with params @api", async ({ request }) => {
        const response = await request.get("/booking", {
            params: {
                firstname: "Jane", lastname: "Doe"
            },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);


        console.log(await response.json());


    });

    test("POST - create booking @api", async ({ request }) => {
        const response = await request.post("/booking", {

            data: {
                "firstname": "Michal",
                "lastname": "Mrkva",
                "totalprice": 222,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2023-08-24",
                    "checkout": "2023-08-29"
                },
                "additionalneeds": "Breakfast"
            }
        });
        console.log(await response.json());
        expect (response.ok()).toBeTruthy();
        expect (response.status()).toBe(200);
        const responseBody = await response.json();
        expect (responseBody.booking).toHaveProperty("firstname", "Michal");
        expect (responseBody.booking).toHaveProperty("lastname", "Mrkva");
        expect (responseBody.booking).toHaveProperty("totalprice", 222);

    });

        test("POST - dynamic data @api", async ({ request }) => {
        const response = await request.post("/booking", {

            data: {
                "firstname": randomFirstName,
                "lastname": randomLastName,
                "totalprice": randomNumber,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2024-09-25",
                    "checkout": "2024-09-28"
                },
                "additionalneeds": "Breakfast"
            }
        });
        console.log(await response.json());
        expect (response.ok()).toBeTruthy();
        expect (response.status()).toBe(200);
        const responseBody = await response.json();
        expect (responseBody.booking).toHaveProperty("firstname", randomFirstName);
        expect (responseBody.booking).toHaveProperty("lastname", randomLastName);
        expect (responseBody.booking).toHaveProperty("totalprice", randomNumber);

    });

    test("PUT - update the booking details @api",async({request})=>{
        const response = await request.post("/auth",{
            data:{
                "username": "admin",
                "password":"password123"
            }
        });
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        token = responseBody.token;
        console.log("New token is: " + token);

        const updateRequest = await request.put("/booking/2",{
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`

            },
            data: {
                "firstname": "Michal",
                "lastname": "Mrkva",
                "totalprice": 444,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2023-08-24",
                    "checkout": "2023-08-29"
                },
                "additionalneeds": "Breakfast"
            }
        });
        console.log(await updateRequest.json());
        expect(updateRequest.ok()).toBeTruthy();
        expect(updateRequest.status()).toBe(200);
        
        const updatedResponseBody = await updateRequest.json();
        console.log(updatedResponseBody);

        expect(updatedResponseBody).toHaveProperty("firstname", "Michal");
        expect(updatedResponseBody).toHaveProperty("lastname", "Mrkva");
        expect(updatedResponseBody).toHaveProperty("totalprice", 444);
        expect(updatedResponseBody).toHaveProperty("depositpaid", true);

    });


    
test.only("Delete - delete the booking details @api",async({request})=>{
        const response = await request.post("/auth",{
            data:{
                "username": "admin",
                "password":"password123"
            }
        });
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        token = responseBody.token;
        console.log("New token is: " + token);
        
        const deleteRequest = await request.delete("/booking/2",{
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`

            }


        });
        expect(deleteRequest.status()).toBe(201);
        expect(deleteRequest.statusText()).toBe("Created");
    });


    test("Block requests @api", async({page,context})=>{
        await context.route(/\.(jpg|png|css)$/,route => route.abort());
        await page.goto("/");
        await page.waitForURL("http://google.com");

    })


});
