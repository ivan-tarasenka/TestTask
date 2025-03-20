import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('aria/Work email');
    }

    public get inputPassword () {
        return $('aria/Password');
    }

    public get btnSubmit () {
        return $('aria/Sign in');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     * @param username user's email
     * @param password user's password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

}

module.exports = new LoginPage();
