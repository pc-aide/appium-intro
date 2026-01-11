# Medium_Phone_API_36.1

## adb
````ps1
# start
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"

# checkUp
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices # output emulator-5554   device
````

## AVD
````ps1
# default : Medium_Phone_API_36.1
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd "Medium_Phone_API_36.1"
````

## appium
````ps1
npm run appium
````

## test
````ps1
npx mocha tests/searchApps.test.js
````
