# appium-intro

## Requirement
0. Virtualization enabled
1. [nodeJS 24-ddl-msi](https://nodejs.org/dist/v24.12.0/node-v24.12.0-x64.msi)
2. [java 11-ddl-msi](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi) ou [java-17-ddl-msi](https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.msi)
3. [android-studio-2025-1.4Gb-ddl-exe](https://r1---sn-t0aedn7e.gvt1.com/edgedl/android/studio/install/2025.2.2.8/android-studio-2025.2.2.8-windows.exe?cms_redirect=yes&met=1767836466,&mh=DE&mip=4.239.111.110&mm=28&mn=sn-t0aedn7e&ms=nvh&mt=1767836170&mv=m&mvi=1&pl=16&rmhost=r3---sn-t0aedn7e.gvt1.com&rms=nvh,nvh&shardbypass=sd&smhost=r5---sn-t0aedn7l.gvt1.com)
4. [cmdLine-tools-9477386](https://dl.google.com/android/repository/commandlinetools-win-9477386_latest.zip)

## env var
### nodeJS
````ps1
# checkUp
node -v
npm -v
````
### java
````ps1
# installDir
setx JAVA_HOME "C:\Program Files\Java\jdk-17" /M ; [Environment]::SetEnvironmentVariable("Path", ([Environment]::GetEnvironmentVariable("Path","Machine") -replace ';%JAVA_HOME%\\bin','') + ';%JAVA_HOME%\bin', "Machine")

# checkUp
java -version
````

### androidStudio
````ps1
& "$env:SystemRoot\System32\setx.exe" ANDROID_HOME "$env:LOCALAPPDATA\Android\sdk" /M
# used by newAVD
& "$env:SystemRoot\System32\setx.exe" ANDROID_SDK_ROOT "$env:LOCALAPPDATA\Android\sdk" /M
& "$env:SystemRoot\System32\setx.exe" PATH "$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\cmdline-tools\bin;$env:PATH" /M

# checkUp
echo $env:PATH
Get-Command adb
````

## Install
````ps1
npm i appium
npx appium driver install uiautomator2
````

## New AVD
````ps1
# peixel 6 - Generic medium phon no loger exists as a device
& "$env:LOCALAPPDATA\Android\Sdk\cmdline-tools\bin\avdmanager.bat" create avd `
  -n pixel_7_api35 `
  -k "system-images;android-35;google_apis_playstore;x86_64" `
  -d "pixel_7"


# checkUp
& "$env:LOCALAPPDATA\Android\Sdk\cmdline-tools\bin\avdmanager.bat" list avd

adb devices
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
