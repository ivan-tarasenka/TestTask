import { browser } from '@wdio/globals'
const ownUrl = "https://app.qase.io/"
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page
    */
    public open (path: string) {
        return browser.url(`${ownUrl}${path}`)
    }
    /**
    * Expect a browser url
    * @param path path of the sub page (e.g. login, project)
    */
    public check(path: string){
        return expect(browser).toHaveUrl(ownUrl + path)
    }
}