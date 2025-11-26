🧪 Playwright Automation Framework (UI + API + Jenkins)

This repository contains a modern End-to-End Automation Framework built using
Playwright, JavaScript, Page Object Model (POM), and Jenkins CI/CD.

The framework supports UI testing, API testing, token-based login bypass,
HTML/Allure reports, and fully parameterized Jenkins pipelines for enterprise-level automation.

🚀 Features
🔹 Playwright UI Automation

Fast & stable cross-browser testing (Chromium, Firefox, WebKit)

Auto-waiting and powerful locators

Parallel execution for faster runs

Headed/headless execution

Screenshot & video capture on failure

Trace viewer support

🔹 API Integration

Token-based authentication using API

Login bypass using localStorage token injection

Faster and more stable tests (no UI login dependency)

🔹 Page Object Model

Clean separation of concerns

Reusable page classes

Maintainable test structure

🔹 Jenkins CI/CD

Parameterized execution:

BROWSER

ENV

TEST_TAG

Automatic report publishing

CI-ready Playwright installation

Pipeline-as-Code compatible

🔹 Reports

Playwright HTML report

Screenshots, videos, traces

Optional Allure reporting (advanced analytics)

📁 Project Structure
project-root/
│── PageObjects/
│   ├── LoginPage.js
│   ├── HomePage.js
│   └── ...
│
│── Utils/
│   ├── ApiUtils.js
│   ├── TestData.json
│   └── ...
│
│── Tests/
│   ├── E2E.spec.js
│   └── ...
│
│── playwright.config.js
│── package.json
│── README.md

🛠️ Installation
Clone the repo
git clone <your-repo-url>
cd <project-folder>

Install dependencies
npm install

Install Playwright browsers
npx playwright install

▶️ Running Tests
Run all tests
npx playwright test

Run in UI mode
npx playwright test --ui

Run a specific tag
npx playwright test --grep @smoke

Run in headed mode
npx playwright test --headed

🔑 API Test + Token Injection (Login Bypass)

The framework uses API to generate an authentication token, then injects it:

await page.addInitScript((token) => {
  window.localStorage.setItem('token', token);
}, token);


This speeds up tests and avoids UI login failures.

📊 Reports
Playwright HTML report
npx playwright show-report


Generated under:

playwright-report/

Allure Report (Optional)
npx allure generate allure-results --clean
npx allure open

🤖 Jenkins CI/CD Integration
Parameterized Pipeline

Supports:

Browser selection

Environment selection

Tag-based execution

Example Jenkinsfile
pipeline {
    agent any

    parameters {
        choice(name: 'BROWSER', choices: ['chromium','firefox','webkit'], description: 'Browser')
        choice(name: 'ENV', choices: ['dev','qa','stage'], description: 'Environment')
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
        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
}

⚙️ Configuration (playwright.config.js)

Includes:

Cross-browser setup

HTML reporter

Screenshots + video + trace

Retry logic

Fully configurable environments

🤝 Contribution

Contributions are welcome.
For major changes, open an issue to discuss your ideas before submitting PRs.
