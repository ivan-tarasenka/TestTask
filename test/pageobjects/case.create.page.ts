import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a create test-case page
 */
class CaseCreatePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputTitle () {
        return $('//*[@id="title"]');
    }

    public get inputDescription () {
        return $('//*[@id="application-content"]/div/div[2]/form/div[1]/div[3]/div/div/div/div/div[2]/div/div[2]/div/div');
    }

    public get selectSeverity () {
        return $('//*[@id="0-severity"]');
    }

    public get inputFile () {
        return $('//input[@type="file"]');
    }
    
    public get addAttachment () {
        return $('aria/Add attachment');
    }

    public get addStep () {
        return $('aria/Add step');
    }

    public get btnSave () {
        return $("#save-case");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to create test-case
     * @param title name test-case
     * @param description description test-case
     */
    public async create (title: string, description: string) {
        await this.inputTitle.setValue(title);
        await this.inputDescription.setValue(description);
        
    }

}

module.exports = new CaseCreatePage();
