# appium-intro

## Requirement
0. Virtualization enabled
1. [nodeJS 24-ddl-msi](https://nodejs.org/dist/v24.12.0/node-v24.12.0-x64.msi)
2. [java 11-ddl-msi](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi) ou [java-17-ddl-msi](https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.msi)
3. [android-studio-2025-1.4Gb-ddl-exe](https://r1---sn-t0aedn7e.gvt1.com/edgedl/android/studio/install/2025.2.2.8/android-studio-2025.2.2.8-windows.exe?cms_redirect=yes&met=1767836466,&mh=DE&mip=4.239.111.110&mm=28&mn=sn-t0aedn7e&ms=nvh&mt=1767836170&mv=m&mvi=1&pl=16&rmhost=r3---sn-t0aedn7e.gvt1.com&rms=nvh,nvh&shardbypass=sd&smhost=r5---sn-t0aedn7l.gvt1.com)


## Install
````ps1
npm i appium
appium driver install uiautomator2
````

## env var
````ps1
# installDir
setx JAVA_HOME "C:\Program Files\Java\jdk-17" /M
setx PATH "%JAVA_HOME%\bin;%PATH%" /M

ANDROID_HOME C:\Users\%localAppdata%\Android\Sdk

PATH %ANDROID_HOME%\platform-tools
PATH %ANDROID_HOME%\emulator
PATH %ANDROID_HOME%\cmdline-tools\latest\bin

PATH %JAVA_HOME%\bin

# checkUp
java -version
javac -version
echo %JAVA_HOME%
````

## New AVD
````ps1
emulator -list-avds
Galaxy_S21

adb devices
appium doctor --android

# launch emulator
emulator -avd Pixel_6_API_33
````

## Start SRV
````ps1
npm run appium

# checkUp
appium doctor
````

## launch the test
````ps1
npm test
````

<img src="https://i.imgur.com/EpXwuiu.png">
