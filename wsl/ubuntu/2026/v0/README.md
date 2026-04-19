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

cd cmdline-tools/
````

## export ANDROID_home
````sh
# 1. Créer la structure Android correcte
mkdir -p ~/Android/cmdline-tools/latest

# 2. Vérifier où vous êtes actuellement
pwd

# 3. Vous êtes dans ~/cmdline-tools/, bouger les fichiers
cd ~/cmdline-tools
ls -la

# 4. Déplacer TOUT le contenu vers la bonne location
mv * ~/Android/cmdline-tools/latest/

# 5. Vérifier que sdkmanager est là
ls -la ~/Android/cmdline-tools/latest/bin/

# 6. Nettoyer le bashrc (effacer les mauvaises entrées)
cat ~/.bashrc | grep -v "ANDROID_HOME\|cmdline-tools" > ~/.bashrc.tmp
mv ~/.bashrc.tmp ~/.bashrc

# env var
echo 'export ANDROID_HOME=$HOME/Android' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator' >> ~/.bashrc

# reload
source ~/.bashrc

# checkUp
sdkmanager --version # output 12.0
````
