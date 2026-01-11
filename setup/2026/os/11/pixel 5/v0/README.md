# Projet Appium - Automatisation Android

## 📋 Guide Complet d'Installation

Ce guide vous accompagne étape par étape pour configurer Appium avec un émulateur Android.

---

## 1️⃣ Prérequis à Installer

### Node.js
Télécharger et installer depuis : https://nodejs.org/
```powershell
# Vérifier l'installation
node --version   # v18+ recommandé
npm --version
```

### Java JDK 17
Télécharger depuis : https://www.oracle.com/java/technologies/downloads/#java17
```powershell
# Vérifier l'installation
java -version
```

### Android Studio
Télécharger depuis : https://developer.android.com/studio

Lors de l'installation, cocher :
- ✅ Android SDK
- ✅ Android SDK Platform-Tools
- ✅ Android Emulator
- ✅ Android SDK Build-Tools

---

## 2️⃣ Variables d'Environnement (Windows)

Ouvrir **PowerShell en Administrateur** et exécuter :

```powershell
# Définir JAVA_HOME
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-17", "User")

# Définir ANDROID_HOME
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")

# Définir ANDROID_SDK_ROOT (alias pour compatibilité)
[System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "$env:LOCALAPPDATA\Android\Sdk", "User")

# Ajouter au PATH
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$androidPaths = "$env:LOCALAPPDATA\Android\Sdk\platform-tools;$env:LOCALAPPDATA\Android\Sdk\emulator;$env:LOCALAPPDATA\Android\Sdk\tools;$env:LOCALAPPDATA\Android\Sdk\tools\bin"
[System.Environment]::SetEnvironmentVariable("Path", "$currentPath;$androidPaths", "User")
```

**⚠️ Redémarrer PowerShell/Terminal après ces modifications !**

### Vérifier les variables
```powershell
echo $env:JAVA_HOME       # C:\Program Files\Java\jdk-17
echo $env:ANDROID_HOME    # C:\Users\<user>\AppData\Local\Android\Sdk
adb --version             # Doit afficher la version ADB
```

---

## 3️⃣ Installer Appium et le Driver

```powershell
# Installer Appium globalement
npm i appium

# Installer le driver UiAutomator2 pour Android
npx appium driver install uiautomator2

# Vérifier l'installation
npx appium --version
npx appium driver list --installed
```

---

## 4️⃣ Créer un AVD (Android Virtual Device)

```powershell
# Lister les images système disponibles
sdkmanager --list | Select-String "system-images"

# Installer une image système (API 34 - Android 14)
sdkmanager "system-images;android-34;google_apis;x86_64"

# Accepter les licences
sdkmanager --licenses

# Créer l'AVD pixel 5
avdmanager create avd -n pixel_5 -k "system-images;android-34;google_apis;x86_64" -d "pixel_5" --force

# Vérifier que l'AVD a été créé
& "$env:ANDROID_HOME\emulator\emulator.exe" -list-avds
```

---

## 5️⃣ Démarrer l'Émulateur

```powershell
# Démarrer l'émulateur pixel_5
& "$env:ANDROID_HOME\emulator\emulator.exe" -avd pixel_5

# Ou avec options pour machines sans GPU puissant
& "$env:ANDROID_HOME\emulator\emulator.exe" -avd pixel_5 -gpu swiftshader_indirect -no-snapshot
```

### Vérifier que l'émulateur est connecté
```powershell
adb devices
# Doit afficher : emulator-5554   device
```

---

## 6️⃣ Démarrer Appium

Dans un **nouveau terminal** :
```powershell
appium
```

Vous devriez voir :
```
[Appium] Welcome to Appium v2.x.x
[Appium] Appium REST http interface listener started on http://0.0.0.0:4723
```

---

## 7️⃣ Lancer les Tests

Dans un **autre terminal** :
```powershell
# Installer les dépendances du projet
npm install

# Exécuter les tests
npm test
```

---

## 📁 Structure du Projet

```
appium/
├── config/
│   └── capabilities.js     # Configuration Appium
├── helpers/
│   └── appiumHelper.js     # Fonctions utilitaires
├── tests/
│   └── example.test.js     # Tests d'exemple
├── screenshots/            # Captures d'écran (auto-créé)
└── package.json
```

---

## 🔧 Configuration de votre App

Modifiez `config/capabilities.js` :

```javascript
// Pour une app installée
'appium:appPackage': 'com.votre.app',
'appium:appActivity': 'com.votre.app.MainActivity',

// Pour installer un APK
'appium:app': 'C:/chemin/vers/app.apk',
```

---

## 📝 Sélecteurs Appium pour Android

```javascript
// Par accessibility id
await driver.$('~accessibilityId')

// Par resource-id
await driver.$('android=new UiSelector().resourceId("com.app:id/button")')

// Par texte
await driver.$('android=new UiSelector().text("Login")')

// Par classe
await driver.$('android=new UiSelector().className("android.widget.Button")')

// Par XPath
await driver.$('//android.widget.Button[@text="Login"]')
```

---

## 🛠️ Commandes Utiles

```powershell
# Lister les appareils connectés
adb devices

# Obtenir le package et activity de l'app au premier plan
adb shell dumpsys window | findstr mCurrentFocus

# Installer une APK
adb install app.apk

# Redémarrer ADB
adb kill-server
adb start-server

# Lister les AVD
& "$env:ANDROID_HOME\emulator\emulator.exe" -list-avds
```

---

## 🔍 Appium Inspector

Pour inspecter les éléments de votre app :
1. Télécharger : https://github.com/appium/appium-inspector/releases
2. Configuration :
   - Remote Host: `localhost`
   - Remote Port: `4723`
   - Remote Path: `/`

---

## ⚡ Résumé Rapide (Quick Start)

```powershell
# Terminal 1 : Démarrer l'émulateur
& "$env:ANDROID_HOME\emulator\emulator.exe" -avd pixel_5

# Terminal 2 : Démarrer Appium
appium

# Terminal 3 : Lancer les tests
npm test
```

