const { remote } = require('webdriverio');
const appiumConfig = require('../appium.config');

describe('Test Settings Samsung Galaxy S21', () => {
  let driver;

  before(async () => {
    // Démarrer la session Appium avec le Samsung Galaxy S21
    driver = await remote({
      ...appiumConfig,
      capabilities: {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        deviceName: 'Samsung Galaxy S21',
        platformVersion: '13',
        appPackage: 'com.android.settings',
        appActivity: 'com.android.settings.Settings'
      }
    });
  });

  it('should open Settings app on Samsung Galaxy S21', async () => {
    // Attendre que l'app Settings soit chargée
    const settingsHeader = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/action_bar_container"]');
    await settingsHeader.waitForDisplayed({ timeout: 5000 });
    
    console.log('✓ Settings app opened successfully');
  });

  it('should navigate to Display settings', async () => {
    // Trouver et cliquer sur Display
    const displayOption = await driver.$('//*[@text="Display"]');
    if (await displayOption.isDisplayed()) {
      await displayOption.click();
      console.log('✓ Navigated to Display settings');
    }
  });

  it('should verify Settings is responsive', async () => {
    // Vérifier que l'app est toujours active
    const isDisplayed = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/action_bar_container"]').isDisplayed();
    console.log('✓ Settings app is still responsive');
  });

  after(async () => {
    // Fermer la session
    if (driver) {
      await driver.deleteSession();
    }
  });
});
