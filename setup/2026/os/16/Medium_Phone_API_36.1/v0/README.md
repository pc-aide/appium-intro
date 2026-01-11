# Medium_Phone_API_36.1

## AVD
````ps1
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd "Medium_Phone_API_36.1"
````

## adb
````ps1
# checkUp 
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd "Medium_Phone_API_36.1"  # output emulator-5554   device
````

## appim
````ps1
emulator-5554   device
````

## test
````ps1
node tests/searchApp.test.js
````
