# appium-intro

## Requirement
1. [nodeJS 24-ddl-msi](https://nodejs.org/dist/v24.12.0/node-v24.12.0-x64.msi)
2. [java 11-ddl-msi](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi) ou [java-17-ddl-msi](https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.msi)
3. [android-studio-2025-1.4Gb-ddl-exe](https://r1---sn-t0aedn7e.gvt1.com/edgedl/android/studio/install/2025.2.2.8/android-studio-2025.2.2.8-windows.exe?cms_redirect=yes&met=1767836466,&mh=DE&mip=4.239.111.110&mm=28&mn=sn-t0aedn7e&ms=nvh&mt=1767836170&mv=m&mvi=1&pl=16&rmhost=r3---sn-t0aedn7e.gvt1.com&rms=nvh,nvh&shardbypass=sd&smhost=r5---sn-t0aedn7l.gvt1.com)

## Tools Installés
- ✓ Android SDK Command-line Tools
- ✓ Java/OpenJDK (Temurin)
- ✓ Android Emulator
- ✓ ADB Platform Tools
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
