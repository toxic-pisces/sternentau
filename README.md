# ⭐ Sternentau - Minecraft Server Projekt-Manager

Eine moderne Web-Anwendung zur Verwaltung von Projekten für den Minecraft-Server "Sternentau". Mit Echtzeit-Synchronisation, Drag & Drop und Minecraft-Theme.

## 🎮 Features

- **Projektverwaltung**
  - Projekte erstellen, bearbeiten und löschen
  - Status-Tracking: Geplant, In Arbeit, Abgeschlossen
  - Deadlines mit Warnung bei Überschreitung
  - Drag & Drop zum Sortieren nach Priorität
  - Farbige Umrandung basierend auf zugeordneten Personen

- **Personenverwaltung**
  - Personen mit Minecraft-Benutzernamen anlegen
  - Automatisches Laden von Minecraft-Avataren
  - Farbkodierung für visuelle Zuordnung
  - Übersicht über zugeordnete Projekte

- **Design**
  - Professionelles Minecraft-Theme (pixeliger Font, blocky Borders)
  - Responsive Design (Mobile, Tablet, Desktop)
  - Dark Mode mit Minecraft-Farbpalette
  - Smooth Animationen und Transitions

- **Technologie**
  - Firebase Realtime Database für Echtzeit-Updates
  - Automatisches Deployment via GitHub Pages
  - TypeScript für Type-Safety

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Datenbank**: Firebase Realtime Database
- **Styling**: CSS Modules + CSS Variables
- **Drag & Drop**: @dnd-kit
- **Deployment**: GitHub Pages
- **Utilities**: date-fns, clsx

## 🚀 Getting Started

### Voraussetzungen

- Node.js 18+ und npm
- Firebase Account (kostenlos)
- Git

### Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/toxic-pisces/sternentau.git
   cd sternentau
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Firebase Projekt erstellen**

   a. Gehe zu [Firebase Console](https://console.firebase.google.com)

   b. Erstelle neues Projekt "sternentau"

   c. Aktiviere **Realtime Database**:
      - Navigiere zu "Build" → "Realtime Database"
      - Klicke "Create Database"
      - Wähle Region: `europe-west1`
      - Starte im **Test Mode** (für Entwicklung)

   d. Registriere Web-App:
      - Gehe zu Project Settings → "Your apps"
      - Klicke auf "</>" Symbol (Web)
      - Registriere App mit Namen "sternentau-web"
      - Kopiere die Firebase Configuration

4. **Environment Variables erstellen**

   Erstelle eine `.env` Datei im Projekt-Root:

   ```env
   VITE_FIREBASE_API_KEY=dein_api_key_hier
   VITE_FIREBASE_AUTH_DOMAIN=dein_projekt_id.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://dein_projekt_id-default-rtdb.europe-west1.firebasedatabase.app
   VITE_FIREBASE_PROJECT_ID=dein_projekt_id
   VITE_FIREBASE_STORAGE_BUCKET=dein_projekt_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

   Ersetze die Werte mit deiner Firebase Configuration.

5. **Minecraft Font installieren (Optional)**

   Für das authentische Minecraft-Feeling:

   a. Downloade einen freien Minecraft-Font:
      - **Monocraft** (empfohlen): https://github.com/IdreesInc/Monocraft/releases
      - **Minecrafter** (Alternative): https://www.dafont.com/minecrafter.font

   b. Benenne die Font-Datei um zu `minecraft.ttf`

   c. Kopiere sie nach `/public/fonts/minecraft.ttf`

   Ohne Font funktioniert die App auch, nutzt dann aber eine Monospace-Fallback-Schrift.

6. **Development Server starten**
   ```bash
   npm run dev
   ```

   Die App läuft jetzt auf `http://localhost:5173`

## 📦 Deployment auf GitHub Pages

### Schritt 1: GitHub Secrets konfigurieren

Gehe zu deinem GitHub Repository → Settings → Secrets and variables → Actions

Füge folgende Secrets hinzu (mit deinen Firebase Credentials):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_DATABASE_URL`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Schritt 2: GitHub Pages aktivieren

1. Gehe zu Repository Settings → Pages
2. Source: "GitHub Actions"
3. Save

### Schritt 3: Pushen und deployen

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Die GitHub Action wird automatisch ausgeführt und deine App deployed!

**Live URL**: `https://toxic-pisces.github.io/sternentau/`

## 🎨 Minecraft Avatar API

Die App nutzt [Crafthead](https://crafthead.net/) für Minecraft-Spieler-Avatare.

**API-Format**: `https://crafthead.net/avatar/{username}/{size}`

**Beispiel**: `https://crafthead.net/avatar/Steve123/128`

- Kostenlos und ohne Rate Limits
- Funktioniert mit allen Minecraft Java Edition Usernames
- Fallback auf Placeholder bei ungültigen Usernames

## 📁 Projektstruktur

```
sternentau/
├── .github/workflows/    # GitHub Actions Deployment
├── public/
│   └── fonts/           # Minecraft Font (manuell hinzufügen)
├── src/
│   ├── components/
│   │   ├── common/      # Wiederverwendbare UI-Komponenten
│   │   ├── layout/      # Layout-Komponenten (Header, Navigation)
│   │   ├── people/      # Personenverwaltung
│   │   └── projects/    # Projektverwaltung
│   ├── contexts/        # React Context (State Management)
│   ├── hooks/           # Custom React Hooks
│   ├── services/        # Firebase Services (CRUD Operationen)
│   ├── types/           # TypeScript Type Definitionen
│   ├── utils/           # Utility Functions (Date, Color)
│   ├── styles/          # Globale Styles & Minecraft Theme
│   ├── App.tsx          # Haupt-App-Komponente
│   └── main.tsx         # Entry Point
├── .env                 # Firebase Credentials (nicht committen!)
├── .env.example         # Template für .env
├── vite.config.ts       # Vite Configuration
└── package.json         # Dependencies
```

## 🔒 Firebase Security

**Wichtig für Produktion**: Die App startet mit Firebase **Test Mode**, der jedem Lese-/Schreibzugriff erlaubt.

Für produktiven Einsatz solltest du die Firebase Rules anpassen:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

Dann Firebase Authentication aktivieren (z.B. Google Sign-In) und in der App integrieren.

## 🐛 Troubleshooting

### Build schlägt fehl
- Überprüfe, ob alle Environment Variables in `.env` korrekt sind
- Führe `npm ci` aus, um Dependencies neu zu installieren

### Firebase Connection Error
- Überprüfe `VITE_FIREBASE_DATABASE_URL` in `.env`
- Stelle sicher, dass Realtime Database aktiviert ist
- Checke Firebase Rules (Test Mode für Entwicklung)

### Minecraft Heads werden nicht geladen
- Überprüfe Internet-Verbindung (API: crafthead.net)
- Stelle sicher, dass Username korrekt geschrieben ist
- Bei fehlgeschlagenen Requests wird automatisch ein Placeholder angezeigt

### Drag & Drop funktioniert nicht
- Stelle sicher, dass mindestens 2 Projekte existieren
- Mobile: Verwende Touch & Hold zum Draggen
- Checke Browser Console für Fehler

## 🎯 Geplante Features

- [ ] Filter: Projekte nach Status filtern
- [ ] Suche: Projekte/Personen durchsuchen
- [ ] Tags: Projekt-Kategorien (Build, Redstone, Farm, etc.)
- [ ] Export: Daten als JSON exportieren
- [ ] Notifications: Browser Notifications für Deadlines
- [ ] Authentication: Multi-User Support mit Firebase Auth
- [ ] Activity Log: Historie von Änderungen

## 📄 Lizenz

Dieses Projekt ist für den privaten Gebrauch auf dem Minecraft-Server "Sternentau" erstellt.

## 🙏 Credits

- **Minecraft Avatare**: [Crafthead.net](https://crafthead.net/)
- **Icons/Emojis**: Unicode
- **Font**: Minecraft-inspirierte Schriftarten (siehe Installation)

---

**Erstellt mit ❤️ für den Sternentau Minecraft Server**

🤖 Generated with [Claude Code](https://claude.com/claude-code)
