import { browser, by, element } from 'protractor';

export class MirapiPage {
    navigateTo(): any {
        return browser.get('/');
    }

    getParagraphText(): any {
        return element(by.css('app #main')).getText();
    }
}
