# CI&T QA Challenge - E2E & API Automation

This repository contains the solution for the QA Analyst technical challenge, focusing on automated testing for the [ServeRest](https://serverest.dev/) application.

##  Architecture and Technical Decisions

The project was structured as a **Test Monorepo**, centralizing both Front-end and Back-end (API) validations within the same suite. This approach maximizes code reuse and simplifies the CI/CD pipeline.

* **Page Object Model (POM):** Isolates UI selectors and interactions to ensure scalability and low maintenance (`cypress/pages/`).
* **Service Object Pattern:** Abstracts API calls, making them easier to maintain and enabling fast, deterministic data setup for UI tests (`cypress/services/`).
* **Data Factories:** Generates dynamic, randomized test data using `@faker-js/faker`, ensuring deterministic executions and avoiding hardcoded values.
* **Custom Commands:** Encapsulates repetitive workflows, such as UI authentication, to keep the test files clean and readable (`cy.uiLogin()`).

##  Test Coverage

The suite implements 3 API scenarios and 3 GUI scenarios, covering the Happy Path as well as negative flows and edge cases.

**API (`/usuarios`)**
1. Successful user registration (HTTP 201 + Schema Contract validation).
2. Error handling for duplicated email registration (HTTP 400).
3. List registered users and validate contract.

**GUI (`/login`)**
*Setup Strategy: User creation is handled via API in the `beforeEach` hook to avoid UI flakiness.*
1. Successful authentication with valid credentials and dashboard validation.
2. Error handling for incorrect passwords.
3. Error handling for non-existent emails.

## Continuous Integration (CI/CD)

The project features a fully automated pipeline configured via **GitHub Actions**. On every _push_ or _pull request_ to the `main` branch, the test suite runs in _headless_ mode inside an isolated Ubuntu container. 
* An HTML report artifact (generated via **Mochawesome**) is attached at the end of every execution, providing visual traceability and logs.

##  How to Run Locally

**1. Clone the repository and install dependencies:**
```bash
npm install
```

**2. Run API tests (Headless):**
```bash
npm run test:api
```

**3. Run GUI tests (Headless):**
```bash
npm run test:gui
```

**4. Run the full suite and generate the HTML report:**
```bash
npm run test
```