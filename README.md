# Playwright Test Automation -- UI & API

This repository contains automated tests written in **Playwright** using
**TypeScript**. The project is divided into **UI tests (Assessment 1)**
and **API tests (Assessment 2)**.

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Playwright
-   TypeScript
-   Node.js
-   npm

------------------------------------------------------------------------



## ▶️ Running Tests via Playwright CLI

### Run a specific test file

``` bash
npx playwright test tests/ui/login.spec.ts
npx playwright test tests/api/create-user.spec.ts
npx playwright test tests/api/get-users.spec.ts
```

### Run all API tests

``` bash
npx playwright test tests/api
```

### Run all UI tests

``` bash
npx playwright test tests/ui
```

### Run all tests

``` bash
npx playwright test
```

------------------------------------------------------------------------

## ▶️ Running Tests via npm Scripts

``` bash
npm run test:login
npm run test:create-user
npm run test:api:users
npm run test
```

### Script Overview

-   **test:login** -- runs UI login tests (Assessment 1)
-   **test:create-user** -- runs API create user test
-   **test:api:users** -- runs API get users test
-   **test** -- runs all UI and API tests

------------------------------------------------------------------------


