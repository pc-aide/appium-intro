# ubuntu

## version
1. wsl v2
2. ubuntu 24

## wsl
````ps1
wsl --install -d Ubuntu --name test-ubu-appium-v11
````

### Requirement
````sh
sudo apt update && sudo apt upgrade -y

# libs
sudo apt install -y libpulse0

# apps
sudo apt install -y unzip
````

### nodeJS
````sh
# latest
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# checkUp
which node # output /user/bin/node
which npm # output /user/bin/npm
````

### java
````sh
sudo apt install -y openjdk-17-jdk

# checkUp
java --version
````

### android
````sh
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip

unzip -o cmdline-tools.zip

cd cmdline-tools/

````

#### export ANDROID_home
````sh
export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools >> ~/.bashrc

echo 'export PATH="$PATH:$ANDROID_HOME/emulator"' >> ~/.bashrc
source ~/.bashrc

# checkUp
sdkmanager --version # output 12.0
````

### sdkmanager
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

### adb
````sh
adb version
````

### AVD
````sh
avdmanager create avd -n pixel_5_api34 -k "system-images;android-34;google_apis;x86_64" --device "pixel_5"
````

### appium
````sh
# mocha - framework of test
# chai - libs of assertions
npm i appium webdriverio mocha chai -D

# driver uiautomator2
npx appium driver install uiautomator2
````
