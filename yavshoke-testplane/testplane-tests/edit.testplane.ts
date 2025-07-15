import { user, inputEmail, inputPassword, loginButton, inputName, saveButton } from '../fixtures/index';

describe('edit page',  () => {
    beforeEach(async ({ browser }) => {
        await browser.openAndWait('/login');
        (await browser.$(inputEmail)).setValue(user.email);
        (await browser.$(inputPassword)).setValue(user.password);
        (await browser.$(loginButton)).click();
        await browser.openAndWait('/edit');
    });

    it('focus state', async({ browser }) => {
        await browser.$(inputName).click();
        await expect(browser.$(inputName)).toBeFocused();
        await browser.$(inputName).assertView('focus-state-inputName');
    });

    it('empty state', async({ browser }) => {
        await browser.$(inputName).click();
        (await browser.$(inputName)).clearValue();
        await browser.$(inputName).assertView('empty-state-inputName');
    });

    it('error state', async({ browser }) => {
        await browser.$(inputName).click();
        (await browser.$(inputName)).clearValue();
        await browser.$(saveButton).click();
        await browser.$(inputName).assertView('error-state-inputName');
    });
})
