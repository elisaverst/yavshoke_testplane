import { inputEmail, inputPassword, loginButton} from '../fixtures/index';

describe('login page',  () => {
    beforeEach(async ({ browser }) => {
        await browser.openAndWait('/login');
        await browser.$(inputEmail).waitForExist({ timeout: 5000 });
        await browser.$(inputPassword).waitForExist({ timeout: 5000 });
    });

    it('default state', async({ browser }) => {
        await expect(browser.$(inputEmail)).toBeDisplayed();
        await browser.$(inputEmail).assertView('default-state-inputEmail');
        await expect(browser.$(inputPassword)).toBeDisplayed();
        await browser.$(inputPassword).assertView('default-state-inputPassword');
        await expect(browser.$(loginButton)).toBeDisplayed();
        await expect(browser.$('[data-testid="login-back-button"]')).toBeDisplayed();
        await expect(browser.$('[data-testid="login-register-button"]')).toBeDisplayed();
    });

    it('focus state', async({ browser }) => {
        await browser.$(inputEmail).click();
        await expect(browser.$(inputEmail)).toBeFocused();
        await browser.$(inputEmail).assertView('focus-state-inputEmail');
        await browser.$(inputPassword).click();
        await expect(browser.$(inputPassword)).toBeFocused();
        await browser.$(inputPassword).assertView('focus-state-inputPassword');
    });

    it('error state', async({ browser }) => {
        await browser.$(inputEmail).setValue('');
        await browser.$(inputPassword).setValue('');
        await browser.$(loginButton).click();
        await expect(browser.$(`//*[text()='Введите email']`)).toBeDisplayed();
        await browser.$(inputEmail).assertView('error-state-inputEmail');
        await expect(browser.$(`//*[text()='Введите пароль']`)).toBeDisplayed();
        await browser.$(inputPassword).assertView('error-state-inputPassword');
    });
})
