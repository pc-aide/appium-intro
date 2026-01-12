# appium-intro

## Requirement
0. Virtualization enabled  
1. [nodeJS 24-ddl-msi](https://nodejs.org/dist/v24.12.0/node-v24.12.0-x64.msi)
2. [java-17-ddl-msi](https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.msi)
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
$env:ANDROID_HOME
````

## appium
````ps1
# mocha - framework of test
# chai - libs of assertions
npm i appium webdriverio mocha chai -D

# driver uiautomator2
npx appium driver install uiautomator2
````

## adb
````ps1
# start service
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" start-server

# list
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices

# default
# List of devices attached
# emulator-5554   offline

# after
# emulator-5554   device

# apk
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" install -r -g "C:\<youtPath>\app.apk"
````

## AVD
````ps1
# default : Medium_Phone_API_36.1
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd "Medium_Phone_API_36.1"

# list devices available
& "$env:LOCALAPPDATA\Android\Sdk\cmdline-tools\bin\avdmanager.bat" list device

# list emulator avd
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -list-avds

# delete device
& "$env:ANDROID_HOME\cmdline-tools\bin\avdmanager.bat" delete avd -n Medium_Phone_API_36.1

# start AVD
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd pixel_6 -no-snapshot-load -wipe-data
````

## Start SRV
````ps1
npx appium
````

## launch the test
````ps1
npx mocha tests/searchApps.test.js
````

<img src="https://i.imgur.com/EpXwuiu.png">
