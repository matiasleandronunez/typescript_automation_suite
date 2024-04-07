import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: 'tests',

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporters to use
    reporter: [
        ['list'],
        ['html', {  open: 'always' }]
    ],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://127.0.0.1:3000',

        // Collect trace, see with https://playwright.dev/docs/trace-viewer
        trace: 'on',

        // Collect video of tests being run https://playwright.dev/docs/videos
        video: 'on',
    },

    // Configure projects for major browsers.
    projects: [
        {
            name: 'setup db',
            testMatch: /.*\.setup\.ts/,
            teardown: 'cleanup db',
        },
        {
            name: 'cleanup db',
            testMatch: /.*\.teardown\.ts/,
        },
        {
            name: 'backend',
            use: { ...devices['Desktop Chrome'], headless: true },
            dependencies: ['setup db'],
            testDir: 'tests/api'
        },
        {
            name: 'frontend',
            use: { ...devices['Desktop Chrome'], headless: process.env.HOST_HAS_GUI != 'true'},
            dependencies: ['setup db'],
            testDir: 'tests/ui'
        },
    ],

    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: 'test-results',

});