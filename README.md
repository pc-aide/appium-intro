# appium-intro

## Requirement
1. [nodeJS 24-ddl-msi](https://nodejs.org/dist/v24.12.0/node-v24.12.0-x64.msi)
2. install android-studio
3. [java 11-ddl-msi](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi)

## Tools Installés
- ✓ Android SDK Command-line Tools
- ✓ Java/OpenJDK (Temurin)
- ✓ Android Emulator
- ✓ ADB Platform Tools
- ✓ Node.js & npm
- ✓ Appium v3.1.2
- ✓ Mocha Test Runner
- ✓ WebdriverIO

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
#!/bin/bash
# Configuration Android SDK
export ANDROID_SDK_ROOT=/opt/homebrew/share/android-commandlinetools
export ANDROID_HOME=$ANDROID_SDK_ROOT
export PATH=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH
export JAVA_HOME=$(/usr/libexec/java_home)

````

## Android Emulator / AVD
````ps1
emulator -list-avds
Galaxy_S21
````

## Start SRV
````ps1
npm run appium
````

## launch the test
````ps1
npm test
````
