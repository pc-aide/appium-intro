const { remote } = require('webdriverio');
const fs = require('fs');
const path = require('path');

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'pixel_5_api34',
    'appium:avd': 'pixel_5_api34',
    'appium:noReset': true,
    'appium:newCommandTimeout': 300
};

const wdOpts = {
    hostname: '127.0.0.1',
    port: 4723,
    logLevel: 'info',
    capabilities
};

async function searchApp() {
    const driver = await remote(wdOpts);

    try {
        console.log('✅ Connecté à l\'émulateur Android');
        await driver.pause(2000);

        // ========== ÉTAPE 1: Aller à l'écran d'accueil (Home) ==========
        console.log('📱 Étape 1: Vérification/Retour à l\'écran d\'accueil...');
        
        // Appuyer sur le bouton Home pour s'assurer qu'on est sur l'écran d'accueil
        await driver.pressKeyCode(3); // KEYCODE_HOME = 3
        await driver.pause(2000);
        console.log('✅ Écran d\'accueil atteint');

        // ========== ÉTAPE 2: Ouvrir le tiroir d'applications (Search Apps) ==========
        console.log('📱 Étape 2: Ouverture du tiroir d\'applications...');
        
        const { width, height } = await driver.getWindowSize();
        
        // Swipe vers le haut pour ouvrir le tiroir d'applications
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.8) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 300 },
                    { type: 'pointerMove', duration: 300, x: Math.floor(width / 2), y: Math.floor(height * 0.2) },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
        await driver.pause(2000);
        console.log('✅ Tiroir d\'applications ouvert');

        // ========== ÉTAPE 3: Ouvrir l'application Settings ==========
        console.log('📱 Étape 3: Recherche et ouverture de Settings...');
        
        // Chercher l'icône Settings dans le tiroir d'applications
        let settingsApp = null;
        
        // Essayer plusieurs sélecteurs possibles pour Settings
        const settingsSelectors = [
            '//*[@text="Settings"]',
            '//*[@content-desc="Settings"]',
            '//*[contains(@text, "Settings")]',
            '//*[contains(@content-desc, "Settings")]',
            '//*[@text="Paramètres"]',
            '//*[contains(@text, "Paramètres")]'
        ];

        for (const selector of settingsSelectors) {
            try {
                settingsApp = await driver.$(selector);
                if (await settingsApp.isDisplayed()) {
                    console.log(`   Trouvé avec: ${selector}`);
                    break;
                }
            } catch (e) {
                // Continuer avec le prochain sélecteur
            }
        }

        if (settingsApp && await settingsApp.isDisplayed()) {
            await settingsApp.click();
            await driver.pause(3000);
            console.log('✅ Application Settings ouverte');
        } else {
            // Alternative: scroller pour trouver Settings
            console.log('   Settings non visible, scroll pour chercher...');
            
            // Scroll vers le bas pour chercher Settings
            for (let i = 0; i < 3; i++) {
                await driver.performActions([
                    {
                        type: 'pointer',
                        id: 'finger1',
                        parameters: { pointerType: 'touch' },
                        actions: [
                            { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
                            { type: 'pointerDown', button: 0 },
                            { type: 'pause', duration: 200 },
                            { type: 'pointerMove', duration: 300, x: Math.floor(width / 2), y: Math.floor(height * 0.3) },
                            { type: 'pointerUp', button: 0 }
                        ]
                    }
                ]);
                await driver.releaseActions();
                await driver.pause(1000);

                // Réessayer de trouver Settings
                try {
                    settingsApp = await driver.$('//*[@text="Settings" or @content-desc="Settings"]');
                    if (await settingsApp.isDisplayed()) {
                        await settingsApp.click();
                        await driver.pause(3000);
                        console.log('✅ Application Settings ouverte après scroll');
                        break;
                    }
                } catch (e) {
                    // Continuer le scroll
                }
            }
        }

        // ========== ÉTAPE 4: Prendre un screenshot ==========
        console.log('📱 Étape 4: Capture d\'écran...');
        
        const screenshot = await driver.takeScreenshot();
        const screenshotPath = path.join(__dirname, '..', 'screenshots');
        
        // Créer le dossier screenshots s'il n'existe pas
        if (!fs.existsSync(screenshotPath)) {
            fs.mkdirSync(screenshotPath, { recursive: true });
        }
        
        const filename = `settings_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
        const fullPath = path.join(screenshotPath, filename);
        
        fs.writeFileSync(fullPath, screenshot, 'base64');
        console.log(`✅ Screenshot sauvegardé: ${fullPath}`);

        // ========== FIN DU TEST ==========
        console.log('');
        console.log('🎉 TEST TERMINÉ AVEC SUCCÈS!');

    } catch (error) {
        console.error('❌ Erreur:', error.message);
    } finally {
        await driver.deleteSession();
        console.log('Session fermée');
    }
}

searchApp();
