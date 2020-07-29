import { MirapiPage } from './app.po';

describe('Mirapi App', () => {
    let page: MirapiPage;

    beforeEach(() => {
        page = new MirapiPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to Mirapi!');
    });
});
