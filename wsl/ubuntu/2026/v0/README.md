# v0

## 
````ps1
wsl --install -d Ubuntu --name apm_v19
````

## Requirements
````sh
sudo apt update && sudo apt upgrade -y

# libs, app (java)
sudo apt install -y libpulse0 unzip openjdk-17-jdk

# checkUp
java --version
````

## nodeJS
````sh
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# checkUp
which node # output /user/bin/node
which npm # output /user/bin/npm
````

## android
````sh
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip

unzip -o cmdline-tools.zip

mkdir -p ~/Android/cmdline-tools/latest

mv cmdline-tools/* ~/Android/cmdline-tools/latest/
rmdir cmdline-tools

# checkUp
ls -la ~/Android/cmdline-tools/latest/bin/

# env vars
echo 'export ANDROID_HOME=$HOME/Android' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator' >> ~/.bashrc

# relaod
source ~/.bashrc

# checkUp
sdkmanager --version # output 12.0
````

## sdkmanger
````sh
# lic
yes | sdkmanager --licenses

# download
sdkmanager --install "platform-tools" "platforms;android-34" "build-tools;34.0.0" "emulator" "system-images;android-34;google_apis;x86_64"
````

## emulator
````sh
echo 'export PATH="$PATH:$ANDROID_HOME/emulator"' >> ~/.bashrc
source ~/.bashrc

# checkUp
emulator -list-avds
````

## kvm
````sh
sudo gpasswd -a $USER kvm

# checkUp
groups # output kvm for your user

# need logOff user, if not err when launched emulaor avd <device>
````

## AVD
````sh
avdmanager create avd -n pixel_5_api34 -k "system-images;android-34;google_apis;x86_64" --device "pixel_5"

# launched
emulator -avd pixel_5_api34

# list-avds
emulator -list-avds

## spec avd
grep -E "hw.cpu.arch|hw.ramSize|disk.dataPartition.size" ~/.android/avd/pixel_5_api34.avd/config.ini | awk -F'=' '/disk.dataPartition.size/ {printf "disk.dataPartition.size = %.2f GB\n", $2/1024/1024/1024} !/disk.dataPartition.size/ {print}'

disk.dataPartition.size = 6.00 GB
hw.cpu.arch = x86_64
hw.ramSize = 1536M

# 4 Go RAM
sed -i 's/hw.ramSize = 1536M/hw.ramSize = 4096M/' ~/.android/avd/pixel_5_api34.avd/config.ini

# checkUp
grep "hw.ramSize" ~/.android/avd/pixel_5_api34.avd/config.ini
````

## appium
````sh
# mocha - framework of test
# chai - libs of assertions
npm i appium webdriverio mocha chai -D

# driver uiautomator2
npx appium driver install uiautomator2
````

## tests/settings.test.js
````js
const { remote } = require('webdriverio');
const appiumConfig = require('../webdriver.config.js');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

describe('login', () => {
  let driver;
  const suiteName = 'login'; // Nom du describe block

  // Fonction pour formater la date en format lisible
  const getFormattedDate = () => {
    const moisAbrev = ['jan', 'fev', 'mar', 'avr', 'mai', 'jun', 'jul', 'aou', 'sep', 'oct', 'nov', 'dec'];
    const now = new Date();
    const jour = String(now.getDate()).padStart(2, '0');
    const mois = moisAbrev[now.getMonth()];
    const annee = now.getFullYear();
    const heure = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const seconde = String(now.getSeconds()).padStart(2, '0');
    return `${jour}_${mois}_${annee}_${heure}h${minute}m${seconde}s`;
  };

  before(async function () {
    this.timeout(60000); // 60 seconds for session initialization
    
    // Créer une config sans appPackage/appActivity pour rester sur home page
    const configWithoutApp = {
      ...appiumConfig,
      capabilities: {
        platformName: appiumConfig.capabilities.platformName,
        'appium:automationName': appiumConfig.capabilities['appium:automationName'],
        'appium:platformVersion': appiumConfig.capabilities['appium:platformVersion'],
        'appium:deviceName': appiumConfig.capabilities['appium:deviceName'],
        'appium:udid': appiumConfig.capabilities['appium:udid'],
        'appium:autoGrantPermissions': appiumConfig.capabilities['appium:autoGrantPermissions'],
        'appium:newCommandTimeout': appiumConfig.capabilities['appium:newCommandTimeout'],
        'appium:videoQuality': appiumConfig.capabilities['appium:videoQuality'],
        'appium:videoSize': appiumConfig.capabilities['appium:videoSize'],
        'appium:videoCodec': appiumConfig.capabilities['appium:videoCodec']
        // appPackage et appActivity intentionnellement absents
      }
    };
    
    // Créer la session Appium (reste sur home page)
    driver = await remote(configWithoutApp);
    console.log('✓ Session initialized on home page');

    // Démarrer l'enregistrement vidéo MAINTENANT (sur home page)
    try {
      await driver.startRecordingScreen();
      console.log('✓ Video recording started from home page');
    } catch (error) {
      console.log('Warning: Could not start video recording:', error.message);
    }
    
    // Lancer Settings via ADB APRÈS avoir commencé l'enregistrement
    await new Promise((resolve) => {
      const adbPath = '/home/paul/Android/platform-tools/adb';
      const command = `${adbPath} shell am start -n com.android.settings/.Settings`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log('Warning: Could not launch Settings app:', error.message);
        } else {
          console.log('✓ Settings app launched - recording in progress');
        }
        // Attendre que Settings se charge
        setTimeout(resolve, 3000);
      });
    });
  });

  it('should open Settings app on Samsung Galaxy S21', async function () {
    this.timeout(30000); // 30 seconds
    // Attendre que l'app Settings soit chargée
    const settingsHeader = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/action_bar_container"]');
    await settingsHeader.waitForDisplayed({ timeout: 5000 });
    
    console.log('✓ Settings app opened successfully');
  });

  it('should navigate to Display settings', async function () {
    this.timeout(30000); // 30 seconds
    // Trouver et cliquer sur Display
    const displayOption = await driver.$('//*[@text="Display"]');
    if (await displayOption.isDisplayed()) {
      await displayOption.click();
      console.log('✓ Navigated to Display settings');
    }
  });

  it('should verify Settings is responsive', async function () {
    this.timeout(30000); // 30 seconds
    // Vérifier que l'app est toujours active
    const isDisplayed = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/action_bar_container"]').isDisplayed();
    console.log('✓ Settings app is still responsive');
  });

  after(async function () {
    this.timeout(15000); // 15 seconds for session cleanup
    
    // Arrêter l'enregistrement vidéo et sauvegarder
    if (driver) {
      try {
        // Attendre un peu pour s'assurer que la vidéo est bien finalisée
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const formattedDate = getFormattedDate();
        const videoPath = path.join(process.cwd(), `${suiteName}_${formattedDate}.mp4`);
        
        // Utiliser saveRecordingScreen pour sauvegarder directement dans un fichier
        await driver.saveRecordingScreen(videoPath);
        
        // Vérifier la taille du fichier
        const stats = fs.statSync(videoPath);
        console.log(`✓ Video saved to ${videoPath} (${(stats.size / 1024).toFixed(2)} KB)`);
      } catch (error) {
        console.log('Warning: Could not save video recording:', error.message);
        
        // Fallback: essayer stopRecordingScreen
        try {
          const videoData = await driver.stopRecordingScreen();
          if (videoData) {
            const formattedDate = getFormattedDate();
            const videoPath = path.join(process.cwd(), `${suiteName}_${formattedDate}_fallback.mp4`);
            fs.writeFileSync(videoPath, Buffer.from(videoData, 'base64'));
            const stats = fs.statSync(videoPath);
            console.log(`✓ Video saved (fallback) to ${videoPath} (${(stats.size / 1024).toFixed(2)} KB)`);
          }
        } catch (fallbackError) {
          console.log('Warning: Fallback video recording also failed:', fallbackError.message);
        }
      }
      
      // Fermer la session
      await driver.deleteSession();
    }
  });
});
````

## webdriver.config.js
````sh
module.exports = {
  protocol: 'http',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  capabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:platformVersion': '14',
    'appium:deviceName': 'Pixel 5',
    'appium:udid': 'emulator-5554',
    'appium:appPackage': 'com.android.settings',
    'appium:appActivity': 'com.android.settings.Settings',
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 60,
    // Configuration pour l'enregistrement vidéo (optimisé pour taille)
    'appium:videoQuality': 'medium',
    'appium:videoSize': '720x480',
    'appium:videoCodec': 'mpeg4'
  }
};
````

## start srv
````sh
npx appium
````

test
````
npx mocha tests/searchApps.test.js
````
