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

## webdriver.config.js
````sh
module.exports = {
  port: 4723,
  host: '127.0.0.1',
  automationName: 'UiAutomator2',
  platformName: 'Android',
  platformVersion: '13',
  deviceName: 'Pixel 5',
  udid: 'emulator-5554',
  app: null,
  autoGrantPermissions: true,
  autoWebview: false,
  newCommandTimeout: 60,
  connectHardwareKeyboard: true
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
