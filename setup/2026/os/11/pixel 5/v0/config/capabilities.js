/**
 * Configuration des capabilities Appium pour Android
 */
const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Samsung_Galaxy_S21', // Samsung Galaxy S21 emulator
    'appium:platformVersion': '11.0', // Android 11 (API 30)
    // Pour tester une app installée :
    // 'appium:appPackage': 'com.example.app',
    // 'appium:appActivity': 'com.example.app.MainActivity',
    
    // Pour installer une APK :
    // 'appium:app': 'C:/chemin/vers/votre/app.apk',
    
    // Options utiles
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 300,
};

const serverConfig = {
    hostname: 'localhost',
    port: 4723,
    path: '/',
    logLevel: 'info',
};

module.exports = { capabilities, serverConfig };
