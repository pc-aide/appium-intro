# appium-intro

## Requirement
1. nodeJS
2. install android-studio
3. java

## Install
````ps1
npm install appium webdriverio --save-dev

#
npm install mocha --save-dev

appium driver install uiautomator2 --no-prompt

# device emulator adb

brew install --cask temurin
````

## env var
````ps1
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin
export ANDROID_SDK_ROOT=/opt/homebrew/share/android-commandlinetools
export JAVA_HOME=$(/usr/libexec/java_home)
````

## Start SRV
````ps1
npm run appium
````

## launch the test
````ps1
npm test
````
