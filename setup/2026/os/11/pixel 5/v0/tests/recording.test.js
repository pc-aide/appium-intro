const { remote } = require('webdriverio');
const { expect } = require('chai');
const { capabilities, serverConfig } = require('../config/capabilities');
const fs = require('fs');
const path = require('path');

describe('Test avec Enregistrement Vidéo', function () {
    this.timeout(120000);

    let driver;

    before(async function () {
        // Connexion au serveur Appium
        driver = await remote({
            ...serverConfig,
            capabilities,
        });

        // ===== DÉMARRER L'ENREGISTREMENT VIDÉO =====
        console.log('🎥 Démarrage de l\'enregistrement vidéo...');
        await driver.startRecordingScreen({
            // Options pour Android
            videoSize: '1280x720',  // Résolution de la vidéo
            timeLimit: 180,         // Durée max en secondes (3 minutes)
            bitRate: 4000000,       // Qualité vidéo (4 Mbps)
            bugReport: false        // Inclure les logs dans la vidéo
        });
        console.log('✓ Enregistrement vidéo démarré!');
    });

    after(async function () {
        if (driver) {
            // ===== ARRÊTER ET SAUVEGARDER L'ENREGISTREMENT =====
            console.log('🎥 Arrêt de l\'enregistrement vidéo...');
            
            try {
                // Récupérer la vidéo encodée en base64
                const video = await driver.stopRecordingScreen();
                
                // Créer le dossier recordings s'il n'existe pas
                const recordingsDir = path.join(__dirname, '..', 'recordings');
                if (!fs.existsSync(recordingsDir)) {
                    fs.mkdirSync(recordingsDir, { recursive: true });
                }
                
                // Sauvegarder la vidéo avec un timestamp
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const videoPath = path.join(recordingsDir, `test_${timestamp}.mp4`);
                
                // Écrire le fichier vidéo
                fs.writeFileSync(videoPath, video, 'base64');
                
                console.log(`✓ Vidéo sauvegardée: ${videoPath}`);
            } catch (error) {
                console.error('❌ Erreur lors de la sauvegarde de la vidéo:', error.message);
            }

            await driver.deleteSession();
        }
    });

    it('Test simple avec enregistrement: Navigation Home -> Settings', async function () {
        console.log('=== Début du test enregistré ===');
        
        // Étape 1: Aller au Home
        console.log('📱 Étape 1: Retour au Home');
        await driver.pressKeyCode(3); // KEYCODE_HOME
        await driver.pause(2000);
        
        // Étape 2: Ouvrir le drawer d'applications
        console.log('📱 Étape 2: Ouvrir le drawer');
        const { width, height } = await driver.getWindowRect();
        
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
        
        // Étape 3: Chercher et ouvrir Settings
        console.log('📱 Étape 3: Ouvrir Settings');
        const settingsSelectors = [
            'android=new UiSelector().text("Settings")',
            'android=new UiSelector().text("Paramètres")',
            'android=new UiSelector().description("Settings")',
        ];

        for (const selector of settingsSelectors) {
            try {
                const settingsApp = await driver.$(selector);
                if (await settingsApp.waitForDisplayed({ timeout: 3000 })) {
                    await settingsApp.click();
                    console.log('✓ Settings ouvert');
                    break;
                }
            } catch (e) {
                // Continuer
            }
        }
        
        await driver.pause(3000);
        
        // Étape 4: Faire un scroll dans Settings
        console.log('📱 Étape 4: Scroll dans Settings');
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
        await driver.pause(2000);
        
        // Prendre un screenshot à la fin
        const screenshot = await driver.takeScreenshot();
        expect(screenshot).to.not.be.null;
        
        console.log('=== Test terminé - La vidéo sera sauvegardée ===');
    });
});
