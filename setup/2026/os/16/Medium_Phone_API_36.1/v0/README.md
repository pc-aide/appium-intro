# Medium_Phone_API_36.1

## AVD
````ps1
# default : Medium_Phone_API_36.1
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd "Medium_Phone_API_36.1"
````

## adb
````ps1
# checkUp 
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd "Medium_Phone_API_36.1"  # output emulator-5554   device
````

## appium
````ps1
npm run appium
````

## test
````ps1
node tests/searchApp.test.js
````
