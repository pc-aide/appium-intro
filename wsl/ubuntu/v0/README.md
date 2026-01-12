# ubuntu

## version
1. wsl v2
2. ubuntu 24

## wsl
````ps1
wsl --install -d Ubuntu --name test-ubu-appium-v11
````

### updates
````sh
sudo apt update && sudo apt upgrade -y
````

### unzip
````sh
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
