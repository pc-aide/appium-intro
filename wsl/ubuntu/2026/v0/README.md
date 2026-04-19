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

