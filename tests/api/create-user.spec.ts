import { test, expect } from '@playwright/test';


import users from '../api/test-data/users.json';

import Ajv from 'ajv';

import { createUserSchema } from '../utils/schemas/createUser.schema';
const ajv = new Ajv();
const validate = ajv.compile(createUserSchema);

const RESPONSE_TIME_LIMIT = 100;

users.forEach((user) => {
  test(`POST - Create user (${user.name})`, async ({ request }) => {
    const startTime = Date.now();

    const response = await request.post('https://reqres.in/api/users', {
      data: user
    });

    const responseTime = Date.now() - startTime;

    // HTTP code
    expect(response.status()).toBe(201);

    // Response time
    expect(responseTime).toBeLessThan(RESPONSE_TIME_LIMIT);

    const body = await response.json();

    // ID & createdAt
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();

    // Schema validation (bonus)
    const valid = validate(body);
    expect(valid).toBe(true);
  });
});
