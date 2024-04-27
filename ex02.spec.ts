import { Page, expect, test } from "@playwright/test";
test.describe("Hook group for OrangeHRM Login Tests", () => {
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        await test.step("Before all", async () => { });

    });

    test.afterAll(async () => {
        await test.step("After all", async () => {
        });
    });

    test.beforeEach(async ({ browser }) => {

        await test.step("Before each test: Go to OrangeHRM Login page", async () => {
            page = await browser.newPage();
            await page.goto(
                "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
            );
            await page.locator("input[name='username']").fill("Admin");
            await page.locator("input[name='password']").fill("admin123");
            await page.locator("button:has-text('Login')").click();
            await page.waitForTimeout(1000);
            // Verify that the Dashboard page is displayed
            await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

            //await page.locator ("//span[contains@class, 'oxd-main-menu-item--name') and text() - 'Admin*]")-click();
            await page.locator("a:has-text('Admin')").click();

            //await page.locator (*//button[contains (@class, 'oxd-button--secondary') and normalize-space(.) - 'Add']") -click();
            await page.locator("button:has-text('Add')").click();
            await page.waitForTimeout(1000);

            // User role
            // page -pause()
            await page.locator("//div[(.)='User Role']/following-sibling::div//div[text()='-- Select --']").click();
            await page.locator("//div[@role='option']/span[text()='Admin']").click();

            //await page.locator("//div[@class='oxd-select-text-input':text('Admin')]").click();
            // await page.locator("oxd-select-text-input div:has-text('Admin')").click();
           // await page.locator("//div[contains(@class,'oxd-select-text-input') and text()='Admin']").click() 

           
            // Status
            // await page.locator("div[data-v-957b4417] .oxd-select-text").click();
            // await page.locator("div[data-v-957b4417] div:has-text('Enabled')").click();
            await page.locator("//label[text() = 'Status']//..//following-sibling::div//i").click()
            await page.locator("//div[@role = 'option']//span[text() = 'Enabled']").click();
            // Emplopyee Name
            await page.locator("//label[text() = 'Employee Name']//..//following-sibling::div//input").fill("ThaoLe");
            await page.locator("//label[text() = 'Username']//..//following-sibling::div//input").fill("ThaoLe123");
            await page.locator("//label[text() = 'Password']//..//following-sibling::div//input").fill("Thao@12345");
            await page.locator("//label[text() = 'Confirm Password']//..//following-sibling::div//input").fill("Thao@12345");


            // click save button
            await page.locator("//button[normalize-space(.) = 'Save']").click();
            await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers");
            await page.close();

             //Logout
             await page.locator("//p[contains(@class, 'oxd-userdropdown-name')]").click();
             await page.locator("//a[text() = 'Logout']").click();
        });

    });

    test.afterEach(async () => {
        await test.step("After each test: Close the page", async () => {
            await page.close();
        });
    });

    ////Pre-condition: Login to the OrangeHRM and create an account on the Admin page (user: Admin, password: admin123)

    // Test Case 01:  Verify that the user can log in successfully when provided the username and password correctly
    test("TC01: User can log in successfully when provided the username and password correctly", async () => {
        // Input valid credentials for the account created at pre-condition
        await test.step("Step 1: Input valid credentials for the account created at pre-condition", async () => {
            await page.locator("input[name='username']").fill("ThaoLe123");
            await page.locator("input[name='password']").fill("Thao@12345");
        });
        // Click the Login button
        await test.step("Step 2: Click on Login button", async () => {
            await page.locator("button:has-text('Login')").click();
        });
        await page.waitForTimeout(1000);
        // Verify that the Dashboard page is displayed
        await test.step("Step 3: Verify that the Dashboard page is displayed", async () => {
            await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
        });
        await page.waitForTimeout(1000);

    });
    // Test Case 02: Verify that the user can not log in successfully when providing username is empty
    test("TC02: User can not log in successfully when providing username is empty", async () => {
        // Leave the username with a blank value
        await test.step("Step 1: Leave the username with a blank value", async () => {
            await page.locator("input[name='username']").fill("");
        });

        // Input the valid password
        await test.step("Step 2: Input the valid password", async () => {
            await page.locator("input[name='password']").fill("Thao123");
        });
        // Click the Login button
        await test.step("Step 3: Click on Login button", async () => {
            await page.locator("button:has-text('Login')").click();
        });
        await page.waitForTimeout(1000);
        // Verify that the “Required” message is displayed below the username textbox
        await test.step("Step 4: Verify that the “Required” message is displayed below the username textbox", async () => {
            await expect(page.locator(":text-is('Required')")).toBeVisible();
        });
        await page.waitForTimeout(1000);
    })
})
