# Firebase Setup Guide

## Schritt-für-Schritt Anleitung

### 1. Firebase Projekt erstellen

1. Gehe zu https://console.firebase.google.com
2. Klicke auf "Projekt hinzufügen"
3. Projekt-Name: **sternentau**
4. Google Analytics: Optional (kann deaktiviert werden)
5. Klicke auf "Projekt erstellen"

### 2. Realtime Database aktivieren

1. Im linken Menü: **Build** → **Realtime Database**
2. Klicke auf **"Datenbank erstellen"**
3. **Standort wählen**: `europe-west1` (Europa)
4. **Sicherheitsregeln**: Wähle **"Im Testmodus starten"**
   ```
   Diese Regeln erlauben jedem Lese-/Schreibzugriff
   Nur für Entwicklung geeignet!
   ```
5. Klicke auf **"Aktivieren"**

### 3. Web-App registrieren

1. In der Projektübersicht: Klicke auf das **"</>"** Symbol (Web)
2. **App-Spitzname**: `sternentau-web`
3. **Firebase Hosting**: Nicht aktivieren (wir nutzen GitHub Pages)
4. Klicke auf **"App registrieren"**

### 4. GitHub Pages Domain autorisieren (WICHTIG!)

⚠️ **Dieser Schritt ist essentiell für GitHub Pages!**

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Klicke auf **"Domain hinzufügen"**
3. Füge hinzu: `toxic-pisces.github.io`
4. Speichern

**Falls Authentication nicht aktiviert ist:**
1. Firebase Console → **Build** → **Authentication**
2. Klicke auf **"Get Started"**
3. Du musst keine Sign-in Methoden aktivieren
4. Gehe dann zu **Settings** → **Authorized domains**
5. Füge `toxic-pisces.github.io` hinzu

### 5. Firebase Configuration kopieren

Du siehst jetzt einen Code-Block wie diesen:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "sternentau-xxxxx.firebaseapp.com",
  databaseURL: "https://sternentau-xxxxx-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sternentau-xxxxx",
  storageBucket: "sternentau-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

### 5. `.env` Datei erstellen

Erstelle im Projekt-Root eine Datei namens `.env` und füge folgendes ein:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=sternentau-xxxxx.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://sternentau-xxxxx-default-rtdb.europe-west1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=sternentau-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=sternentau-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

**Ersetze die Werte** mit deiner eigenen Firebase Configuration!

### 6. App lokal starten

```bash
npm run dev
```

Die App sollte jetzt funktionieren und mit Firebase verbunden sein!

### 7. GitHub Secrets einrichten (für Deployment)

1. Gehe zu deinem GitHub Repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Klicke auf **"New repository secret"**
4. Füge folgende Secrets hinzu (mit deinen Firebase Werten):

   - Name: `VITE_FIREBASE_API_KEY`, Value: `AIzaSy...`
   - Name: `VITE_FIREBASE_AUTH_DOMAIN`, Value: `sternentau-xxxxx.firebaseapp.com`
   - Name: `VITE_FIREBASE_DATABASE_URL`, Value: `https://sternentau-xxxxx...`
   - Name: `VITE_FIREBASE_PROJECT_ID`, Value: `sternentau-xxxxx`
   - Name: `VITE_FIREBASE_STORAGE_BUCKET`, Value: `sternentau-xxxxx.appspot.com`
   - Name: `VITE_FIREBASE_MESSAGING_SENDER_ID`, Value: `123456789012`
   - Name: `VITE_FIREBASE_APP_ID`, Value: `1:123456789012:web:...`

### 8. (Optional) Produktionsregeln setzen

Für Produktion solltest du die Firebase Rules anpassen:

1. Firebase Console → **Realtime Database** → **Regeln**
2. Ändere die Regeln:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **Warnung**: Diese Regeln erlauben jedem Zugriff. Für echte Sicherheit solltest du Firebase Authentication aktivieren:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

Dann müsstest du Authentication in der App implementieren.

## Datenstruktur

Die App erstellt automatisch folgende Struktur in der Database:

```
sternentau-xxxxx/
├── projects/
│   ├── project-uuid-1/
│   │   ├── id: "project-uuid-1"
│   │   ├── title: "Spawn Area"
│   │   ├── description: "..."
│   │   ├── status: "In Arbeit"
│   │   ├── priority: 1
│   │   ├── createdAt: 1702645200000
│   │   ├── deadline: 1704945200000
│   │   └── assignedPeople: ["person-uuid-1"]
│   └── ...
└── people/
    ├── person-uuid-1/
    │   ├── id: "person-uuid-1"
    │   ├── name: "Steve"
    │   ├── color: "#4CAF50"
    │   └── minecraftUsername: "Steve123"
    └── ...
```

## Troubleshooting

### "Permission Denied" Fehler
- Überprüfe Firebase Rules (sollten im Test Mode sein)
- Stelle sicher, dass Database URL korrekt ist

### "Failed to fetch"
- Überprüfe Internet-Verbindung
- Checke ob `.env` Datei korrekt ist
- Starte Dev-Server neu: `npm run dev`

### GitHub Actions schlagen fehl
- Überprüfe, ob alle Secrets korrekt eingerichtet sind
- Checke GitHub Actions Logs für Details

## Fertig!

Deine App sollte jetzt mit Firebase verbunden sein und Echtzei-Daten synchronisieren! 🎉
