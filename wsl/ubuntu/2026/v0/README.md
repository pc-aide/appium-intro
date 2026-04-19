# v0

## 
````ps1
wsl --install -d Ubuntu --name apm_v19
````

## Requirements
````sh
sudo apt update && sudo apt upgrade -y

# libs, app (java)
sudo apt install -y libpulse0 unzip openjdk-17-jdk

# checkUp
java --version
````

## nodeJS
````sh
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# checkUp
which node # output /user/bin/node
which npm # output /user/bin/npm
````

## android
````sh
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip

unzip -o cmdline-tools.zip

mkdir -p ~/Android/cmdline-tools/latest

mv cmdline-tools/* ~/Android/cmdline-tools/latest/
rmdir cmdline-tools

# checkUp
ls -la ~/Android/cmdline-tools/latest/bin/

# env vars
echo 'export ANDROID_HOME=$HOME/Android' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator' >> ~/.bashrc

# relaod
source ~/.bashrc

# checkUp
sdkmanager --version # output 12.0
````

## sdkmanger
````sh
````
