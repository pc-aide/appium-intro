const { remote } = require('webdriverio');
const { capabilities, serverConfig } = require('../config/capabilities');

/**
 * Classe helper pour les actions Appium courantes
 */
class AppiumHelper {
    constructor() {
        this.driver = null;
    }

    /**
     * Initialiser la session Appium
     */
    async init(customCapabilities = {}) {
        this.driver = await remote({
            ...serverConfig,
            capabilities: { ...capabilities, ...customCapabilities },
        });
        return this.driver;
    }

    /**
     * Fermer la session
     */
    async quit() {
        if (this.driver) {
            await this.driver.deleteSession();
            this.driver = null;
        }
    }

    /**
     * Attendre un élément et le retourner
     */
    async waitForElement(selector, timeout = 10000) {
        const element = await this.driver.$(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    /**
     * Cliquer sur un élément
     */
    async click(selector) {
        const element = await this.waitForElement(selector);
        await element.click();
    }

    /**
     * Saisir du texte dans un champ
     */
    async type(selector, text) {
        const element = await this.waitForElement(selector);
        await element.setValue(text);
    }

    /**
     * Obtenir le texte d'un élément
     */
    async getText(selector) {
        const element = await this.waitForElement(selector);
        return element.getText();
    }

    /**
     * Vérifier si un élément est affiché
     */
    async isDisplayed(selector, timeout = 5000) {
        try {
            const element = await this.driver.$(selector);
            await element.waitForDisplayed({ timeout });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Faire défiler vers le bas
     */
    async scrollDown() {
        const { width, height } = await this.driver.getWindowSize();
        await this.driver.touchAction([
            { action: 'press', x: width / 2, y: height * 0.8 },
            { action: 'wait', ms: 500 },
            { action: 'moveTo', x: width / 2, y: height * 0.2 },
            { action: 'release' },
        ]);
    }

    /**
     * Faire défiler vers le haut
     */
    async scrollUp() {
        const { width, height } = await this.driver.getWindowSize();
        await this.driver.touchAction([
            { action: 'press', x: width / 2, y: height * 0.2 },
            { action: 'wait', ms: 500 },
            { action: 'moveTo', x: width / 2, y: height * 0.8 },
            { action: 'release' },
        ]);
    }

    /**
     * Prendre une capture d'écran
     */
    async takeScreenshot(filename) {
        const screenshot = await this.driver.takeScreenshot();
        const fs = require('fs');
        const path = require('path');
        const screenshotsDir = path.join(__dirname, '..', 'screenshots');
        
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }
        
        const filepath = path.join(screenshotsDir, `${filename}.png`);
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log(`Screenshot saved: ${filepath}`);
        return filepath;
    }

    /**
     * Appuyer sur le bouton retour Android
     */
    async pressBack() {
        await this.driver.pressKeyCode(4);
    }

    /**
     * Appuyer sur le bouton home Android
     */
    async pressHome() {
        await this.driver.pressKeyCode(3);
    }
}

module.exports = AppiumHelper;
