import { user, inputEmail, inputPassword, loginButton, userAvatar } from '../fixtures/index';

describe('profile page',  () => {
    beforeEach(async ({ browser }) => {
        await browser.openAndWait('/login');
        (await browser.$(inputEmail)).setValue(user.email);
        (await browser.$(inputPassword)).setValue(user.password);
        (await browser.$(loginButton)).click();
    });

    it('avatar', async ({ browser }) => {
        const wasRemoved = await browser.execute(() => {
            const gif = document.querySelector('[data-testid="user-avatar"] gif');
            if (gif) {
                gif.remove();
                return true;
            }
            return false;
        });
        
        await browser.pause(2000); 
        
        const avatar = await browser.$(userAvatar);
        await avatar.waitForExist({ timeout: 3000 }); 
        await avatar.assertView('avatar-static', {
            screenshotDelay: 1000,
        });
    });
})
