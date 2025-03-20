import Page from "../pageobjects/page";

const loginPage = require('../pageobjects/login.page.ts')
const projectPage = require('../pageobjects/project.page.ts')
const caseCreatePage = require('../pageobjects/case.create.page.ts')

const fs = require('fs');



describe("Test Task", () => {
    it("Test Task", async () => {

        const path = require('path');
        const filePathJ = path.join(process.cwd(), 'conf/test.json')
        const data = fs.readFileSync(filePathJ, 'utf8');
        const jsonObject = JSON.parse(data);
        /** 
         * Configured browser
         */
        await browser.setWindowSize(980, 800)

        /** 
         * work with login page
         */
        const page = new Page();
        await page.open('login')
        await page.check("login")

        await loginPage.login(jsonObject.login, jsonObject.pwd)

        /**
         * work with project page
         */

        await page.check("projects")

        // unique element for name project 
        const now = new Date()
        const projectName = jsonObject.name + now.toLocaleString();
        const projectCode = jsonObject.code + now.toTimeString().split(' ')[0].replace(/:/g, '')

        await projectPage.btnCreateNewProject.click()

        const dialodUtateTime = await browser.$("[alt='Time to upgrade!']")
        if (await dialodUtateTime.isExisting()) {
            console.log('Please, change your enviroment (delete some project)')
            throw new Error('Please, change your enviroment (delete some project)')
        }

        await projectPage.createNewProject(projectName, projectCode, jsonObject.description)

        await page.check("project/" + projectCode)

        await projectPage.btnCreateCase.waitForExist({ timeout: 50000 });
        await projectPage.btnCreateCase.click()

        /**
         * work with case create page
         */
        await page.check("case/" + projectCode + "/create")

        await caseCreatePage.create(jsonObject.case.title, jsonObject.case.description)

        await browser.$("[aria-controls='0-severity-listbox']").click()
        await browser.pause(1000)
        await browser.$("//*[@id='0-severity-option-" + jsonObject.case.severity + "']").click()
        

        await caseCreatePage.addAttachment.click()

        const filePath = path.join(process.cwd(), jsonObject.case.file)
        const remoteFilePath = await browser.uploadFile(filePath)

        const fileInput = await caseCreatePage.inputFile 

        await browser.execute(function (el) {
            el.style.visibility = 'visible'
            el.style.height = '100px'
            el.style.width = '100px'
            el.style.zIndex = '10000'
        }, fileInput);

        await fileInput.setValue(remoteFilePath)

        await browser.pause(5000)

        for (let i = 0; i < jsonObject.case.steps.length; i++) {
            const st = jsonObject.case.steps[i];
            await caseCreatePage.addStep.click();
            await browser.$("//*[@id='edit-step-" + i + "']/div/div/div[2]/div/div[1]/div[2]/div/div/div[2]/div/div[2]/div/div").setValue(st.step)
        }

        await caseCreatePage.btnSave.click()

        await browser.pause(1000)

        await browser.$("/html/body/div[1]/div/div[1]/aside/nav/ul/li[1]/ul/li[1]/a/label").click()
       
        await browser.pause(5000)

        const nameTeat = browser.$("[aria-label='Open the test case " + projectCode + "-1']")
        if (!(await nameTeat.isExisting())){
            throw new Error("Test didn't create")
        }


        await browser.pause(5000)
    });
});