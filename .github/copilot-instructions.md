# Copilot Instructions for E-Commerce Project

## Overview
This repository contains an End-to-End Automation Framework built with Playwright, JavaScript, and the Page Object Model (POM). It supports both UI and API testing, integrates with Jenkins CI/CD, and provides detailed reporting capabilities.

### Key Features:
- **Playwright UI Automation**: Cross-browser testing with Chromium, Firefox, and WebKit.
- **API Integration**: Token-based authentication and login bypass.
- **Page Object Model (POM)**: Clean, reusable, and maintainable test structure.
- **Jenkins Integration**: Parameterized pipelines for browser, environment, and tag-based execution.
- **Reports**: Playwright HTML reports and optional Allure reports.

---

## Project Structure

```
project-root/
│── PageObjects/       # Contains page classes for POM
│── Utils/             # Utility files (e.g., API helpers, test data)
│── Tests/             # Test files
│── playwright.config.js # Playwright configuration
│── package.json       # Dependencies and scripts
│── README.md          # Project documentation
```

### Key Files:
- **`PageObjects/`**: Contains classes like `LoginPage.js`, `DashboardPage.js`, etc., implementing the POM pattern.
- **`Utils/ApiUtils.js`**: Handles API interactions, including token generation.
- **`Tests/E2EProject.spec.js`**: Example test file showcasing UI and API integration.
- **`playwright.config.js`**: Centralized configuration for Playwright.

---

## Developer Workflows

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Running Tests
- Run all tests:
  ```bash
  npx playwright test
  ```
- Run tests in UI mode:
  ```bash
  npx playwright test --ui
  ```
- Run tests with a specific tag:
  ```bash
  npx playwright test --grep @smoke
  ```
- Run tests in headed mode:
  ```bash
  npx playwright test --headed
  ```

### Debugging
- Use the `--debug` flag to debug tests:
  ```bash
  npx playwright test --debug
  ```

### Reporting
- Generate and view Playwright HTML reports:
  ```bash
  npx playwright show-report
  ```
- Generate and view Allure reports (if configured):
  ```bash
  npx allure generate allure-results --clean
  npx allure open
  ```

---

## Project-Specific Conventions

### Page Object Model (POM)
- Each page class (e.g., `LoginPage.js`, `DashboardPage.js`) encapsulates locators and methods for interacting with a specific page.
- Example:
  ```javascript
  class LoginPage {
      constructor(page) {
          this.page = page;
          this.emailField = page.locator('#email');
          this.passwordField = page.locator('#password');
          this.loginButton = page.locator('#login');
      }

      async login(email, password) {
          await this.emailField.fill(email);
          await this.passwordField.fill(password);
          await this.loginButton.click();
      }
  }
  module.exports = { LoginPage };
  ```

### API Integration
- Use `Utils/ApiUtils.js` for API interactions.
- Example: Generating a token and injecting it into localStorage:
  ```javascript
  const token = await apiUtils.generateAuthToken();
  await page.addInitScript((token) => {
      window.localStorage.setItem('token', token);
  }, token);
  ```

### Jenkins Integration
- Parameterized pipelines allow flexible test execution.
- Example `Jenkinsfile` snippet:
  ```groovy
  pipeline {
      agent any
      parameters {
          choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser')
          choice(name: 'ENV', choices: ['dev', 'qa', 'stage'], description: 'Environment')
          string(name: 'TEST_TAG', defaultValue: '@smoke', description: 'Tag to execute')
      }
      stages {
          stage('Install Dependencies') {
              steps {
                  sh 'npm ci'
              }
          }
          stage('Run Tests') {
              steps {
                  sh "npx playwright test --project=${BROWSER} --grep=${TEST_TAG}"
              }
          }
      }
  }
  ```

---

## External Dependencies
- **Playwright**: Core testing framework.
- **Jenkins**: CI/CD integration.
- **Allure**: Optional reporting tool.

---

## Contribution Guidelines
- Follow the POM pattern for adding new pages.
- Use `Utils/` for shared utilities.
- Write tests in `Tests/` and group them logically.
- Ensure all tests pass before submitting a pull request.

---

For more details, refer to the [README.md](../README.md).