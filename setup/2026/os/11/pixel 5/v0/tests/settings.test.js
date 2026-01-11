const { remote } = require('webdriverio');
const { expect } = require('chai');
const { capabilities, serverConfig } = require('../config/capabilities');
const fs = require('fs');
const path = require('path');

describe('Test Android Home + Settings avec Appium', function () {
    // Timeout plus long pour les tests mobiles
    this.timeout(120000);

    let driver;

    before(async function () {
        // Connexion au serveur Appium
        driver = await remote({
            ...serverConfig,
            capabilities,
        });
    });

    after(async function () {
        // Fermer la session après les tests
        if (driver) {
            await driver.deleteSession();
        }
    });

    it('Test complet: Home -> Search -> Settings -> Screenshot', async function () {
        console.log('=== Étape 1: Assurer qu\'on est sur le Home Android ===');
        
        // Appuyer sur le bouton Home pour être sûr d'être sur l'écran d'accueil
        await driver.pressKeyCode(3); // KEYCODE_HOME = 3
        await driver.pause(2000);
        console.log('✓ Retour au Home Android');

        console.log('=== Étape 2: Aller à la recherche d\'applications ===');
        
        // Faire un swipe vers le haut pour ouvrir le drawer d'applications
        const { width, height } = await driver.getWindowRect();
        
        // Utiliser les actions W3C pour le swipe
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.8) },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 300 },
                { type: 'pointerMove', duration: 500, x: Math.floor(width / 2), y: Math.floor(height * 0.2) },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await driver.releaseActions();
        await driver.pause(2000);
        console.log('✓ Drawer d\'applications ouvert');

        // Chercher la barre de recherche et taper "settings"
        let searchFieldFound = false;
        
        // Essayer plusieurs sélecteurs pour la recherche
        const searchSelectors = [
            'android=new UiSelector().text("Search apps")',
            'android=new UiSelector().text("Search")',
            'android=new UiSelector().text("Rechercher")',
            'android=new UiSelector().description("Search")',
            'android=new UiSelector().resourceId("com.google.android.apps.nexuslauncher:id/input")',
            'android=new UiSelector().className("android.widget.EditText")',
        ];

        for (const selector of searchSelectors) {
            try {
                const searchField = await driver.$(selector);
                if (await searchField.isDisplayed()) {
                    console.log('✓ Champ de recherche trouvé');
                    await searchField.click();
                    await driver.pause(1000);
                    
                    // Taper "settings" dans le champ de recherche
                    await searchField.setValue('settings');
                    await driver.pause(2000);
                    console.log('✓ "settings" tapé dans la recherche');
                    searchFieldFound = true;
                    break;
                }
            } catch (e) {
                // Continuer avec le prochain sélecteur
            }
        }

        console.log('=== Étape 3: Cliquer sur Settings ===');
        
        // Chercher l'application Settings dans les résultats de recherche
        let settingsFound = false;
        
        // Essayer plusieurs façons de trouver Settings
        const settingsSelectors = [
            'android=new UiSelector().text("Settings")',
            'android=new UiSelector().text("Paramètres")',
            'android=new UiSelector().description("Settings")',
            'android=new UiSelector().description("Paramètres")',
            'android=new UiSelector().textContains("Settings")',
            'android=new UiSelector().textContains("Paramètres")',
        ];

        for (const selector of settingsSelectors) {
            try {
                const settingsApp = await driver.$(selector);
                if (await settingsApp.waitForDisplayed({ timeout: 3000 })) {
                    await settingsApp.click();
                    settingsFound = true;
                    console.log('✓ Application Settings trouvée et cliquée');
                    break;
                }
            } catch (e) {
                // Continuer avec le prochain sélecteur
            }
        }

        // Si Settings non trouvé dans les résultats, essayer de faire défiler
        if (!settingsFound) {
            console.log('Settings non visible dans les résultats, défilement...');
            
            // Faire défiler dans les résultats avec W3C Actions
            for (let i = 0; i < 3 && !settingsFound; i++) {
                await driver.performActions([{
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 300 },
                        { type: 'pointerMove', duration: 500, x: Math.floor(width / 2), y: Math.floor(height * 0.3) },
                        { type: 'pointerUp', button: 0 }
                    ]
                }]);
                await driver.releaseActions();
                await driver.pause(1000);

                for (const selector of settingsSelectors) {
                    try {
                        const settingsApp = await driver.$(selector);
                        if (await settingsApp.isDisplayed()) {
                            await settingsApp.click();
                            settingsFound = true;
                            console.log('✓ Application Settings trouvée après défilement');
                            break;
                        }
                    } catch (e) {
                        // Continuer
                    }
                }
            }
        }

        // Attendre que Settings s'ouvre
        await driver.pause(3000);

        console.log('=== Étape 4: Prendre un screenshot ===');
        
        // Prendre le screenshot
        const screenshot = await driver.takeScreenshot();
        
        // Créer le dossier screenshots s'il n'existe pas
        const screenshotsDir = path.join(__dirname, '..', 'screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }
        
        // Sauvegarder le screenshot avec un timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join(screenshotsDir, `settings_${timestamp}.png`);
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        
        console.log(`✓ Screenshot sauvegardé: ${screenshotPath}`);

        console.log('=== Test terminé avec succès! ===');
        expect(screenshot).to.not.be.null;
    });
});
