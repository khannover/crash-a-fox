# crash-a-fox 🦊

**HTML5 Endless Runner mit Music-Reactive-Modus** – Steuere den Fuchs durch den Wald, weiche Hindernissen aus und rocke mit deiner eigenen Musik!

![Crash Fuchs](https://via.placeholder.com/800x400/2D4A1E/fcd34d?text=Crash+Fuchs+Gameplay) <!-- TODO: Screenshot einfügen -->

## ✨ Features

- 🎮 **Klassischer Endless Runner** mit 3 Spuren
- 🦊 **Fuchs-Animation** mit realistischer Lauf- und Sprungbewegung (Three.js)
- 🎵 **Music Reactive Mode** – Die Musik steuert die Geschwindigkeit, Beat-Detection & Visualizer
- 🎶 Unterstützt lokale MP3s, Audio-URLs und Bancamp-Integration
- 🏆 **Highscore-System** mit Backend-Speicherung (SQLite)
- 📱 Vollständige Mobile-Unterstützung (Swipe-Steuerung)
- 🔧 Docker-Ready (einfach deploybar)
- 🌀 Schöne Wald-Atmosphäre mit Nebel und Beleuchtung

## 🎮 Steuerung

| Aktion          | Tastatur                  | Mobile          |
|-----------------|---------------------------|-----------------|
| Spur wechseln   | ⬅️ ➡️ oder A / D        | Links/Rechts wischen |
| Springen        | ⬆️ / Leertaste / W     | Nach oben wischen    |
| Music Mode      | Über den Button im Menü | -               |

## 🚀 Schnellstart (lokal)

### Voraussetzungen
- Node.js ≥ 18
- npm

```bash
# Repo klonen
git clone https://github.com/khannover/crash-a-fox.git
cd crash-a-fox

# Abhängigkeiten installieren
npm install

# Server starten
npm start
```

Dann im Browser öffnen: **http://localhost:3000**

## 🐳 Mit Docker

```bash
# Mit docker-compose
 docker compose up --build

# Oder nur Docker
 docker build -t crash-a-fox .
 docker run -p 3000:3000 crash-a-fox
```

## 🎵 Music Mode

1. Im Startmenü auf **🎵 Music Mode** klicken
2. Schwierigkeit wählen (Easy / Normal / Hard)
3. Entweder:
   - MP3-Datei hochladen
   - Audio-URL einfügen
   - Oder einen Bancamp-Track auswählen (falls konfiguriert)
4. Auf **Play with Music** klicken

Der Fuchs reagiert auf Bass, Beats und die Energie deiner Musik!

## 📁 Projektstruktur

```
crash-a-fox/
├── index.html          # Das komplette Spiel (Three.js + UI)
├── server.js           # Express + Highscore API + Music Proxy
├── package.json
├── Dockerfile
├── docker-compose.yml
├── data/               # SQLite Datenbank (wird automatisch erstellt)
└── README.md
```

## 🔄 API Endpunkte (Highscores)

- `GET /api/highscores?limit=10` – Top Highscores
- `POST /api/highscores` – Score speichern
  ```json
  { "name": "DeinName", "score": 12345, "mode": "normal" }
  ```

## ⚙️ Konfiguration

Umgebungsvariablen (optional):

| Variable                | Beschreibung                          | Standard     |
|-------------------------|---------------------------------------|--------------|
| `PORT`                  | Server-Port                           | 3000         |
| `DATA_DIR`              | Ordner für die SQLite-DB         | `./data`     |
| `BANCAMP_API_BASE_URL`  | Basis-URL für Bancamp Music Proxy | -            |

## 🚀 Roadmap / Ideen

- [ ] Bessere Trennung des JavaScript-Codes (Module)
- [ ] Weitere Power-ups & Collectibles
- [ ] Soundeffekte & bessere Audio-Visualisierung
- [ ] Highscore-Filter nach Spielmodus
- [ ] Leaderboard mit Pagination

## 👍 Mitwirken

Pull Requests sind willkommen! 
Erstelle gerne einen Feature-Branch und beschreibe deine Änderungen klar.

---

**Viel Spaß beim Fuchs-Rennen!** 🦊
