module.exports = {
  port: 4723,
  host: '127.0.0.1',
  automationName: 'UiAutomator2',
  platformName: 'Android',
  platformVersion: '13', // Galaxy S21 runs Android 13+
  deviceName: 'Samsung Galaxy S21',
  app: null, // Pour tester les apps système
  autoGrantPermissions: true,
  autoWebview: false,
  newCommandTimeout: 60,
  connectHardwareKeyboard: true
};
