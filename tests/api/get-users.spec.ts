import { test, expect } from '@playwright/test';


test('GET users – API contract validation', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=1');
  
  //NOTE: Reqres API is protected by Cloudflare and may return 403 for automated API requests.
  if (response.status() !== 200) {
    test.skip(true, 'Reqres API blocked by Cloudflare');
  }

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Assert total
    expect(body.total).toBeDefined();
    expect(typeof body.total).toBe('number');

    // Assert pagination correctness
    expect(body.data.length).toBe(body.per_page);

    // Assert last_name for first two users
    expect(body.data[0].last_name).toBeDefined();
    expect(body.data[1].last_name).toBeDefined();

    // Bonus – data types assertions
    body.data.forEach((user: any) => {
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
      expect(typeof user.avatar).toBe('string');
});
 });


/* 2 version 
test.describe('GET - List Users (browser fetch)', () => {
  test('should validate users list response', async ({ page }) => {
    

    await page.goto('https://reqres.in');

    // Fetch priamo z prehliadača 
    const data = await page.evaluate(async () => {
      const response = await fetch('https://reqres.in/api/users?page=1', {
        headers: {
          'Accept': 'application/json',
          'User-Agent': navigator.userAgent
        }
      });
      return response.json();
    });

    
    expect(data).toBeDefined();
    expect(typeof data.total).toBe('number');
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBe(data.per_page);

    
    expect(data.data[0].last_name).toBeDefined();
    expect(data.data[1].last_name).toBeDefined();

    
    data.data.forEach((user: any) => {
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
      expect(typeof user.avatar).toBe('string');
    });
  });
});

*/


