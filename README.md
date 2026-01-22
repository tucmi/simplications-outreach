# Daten-Memory Spiel

Ein interaktives Memory-Spiel, bei dem Spieler Datenvisualisierungen mit den passenden Geschichten zusammenbringen müssen.

## Projektstruktur

```log
simplications-outreach/
├── index.html       # Haupt-HTML-Datei
├── styles.css       # Styling (mit Simplications Farben)
├── script.js        # Spiellogik und Spieldaten
└── README.md        # Diese Datei
```

## Verwendung

1. Öffne `index.html` in einem modernen Webbrowser
2. Das Spiel startet automatisch
3. Klicke "Neues Spiel" um die Karten neu zu mischen
4. Finde passende Paare aus Graphen und Geschichten

## Daten hinzufügen

Die Spieldaten sind direkt in `script.js` integriert. Bearbeite das `gameData` Array am Anfang der Datei:

```javascript
const gameData = [
    {
        id: 1,
        storyTitle: "Titel der Geschichte",
        storyText: "Beschreibung was der Graph zeigt oder welche Geschichte dahinter steckt",
        graphImage: "pfad/zum/graph-bild.png"
    },
    // Weitere Einträge hinzufügen...
];
```

### Beispiel

```javascript
const gameData = [
    {
        id: 1,
        storyTitle: "Morgendliche Routine",
        storyText: "Die Daten zeigen einen deutlichen Temperaturanstieg zwischen 6 und 7 Uhr morgens, wenn die Heizung automatisch eingeschaltet wird.",
        graphImage: "images/temperature-morning.png"
    },
    {
        id: 2,
        storyTitle: "Wochenendverhalten",
        storyText: "Am Wochenende bleibt die Wohnung länger unbewohnt, erkennbar an der fehlenden Bewegung bis 10 Uhr.",
        graphImage: "images/movement-weekend.png"
    }
];
```

## Graphen erstellen

Für die Graphen können verwendet werden:

- PNG/JPG Bilder
- SVG-Dateien
- Screenshot von Datenvisualisierungen
- Handgezeichnete Diagramme

Empfohlene Bildgröße: 400x300px oder höher

## Farben

Das Design verwendet die offiziellen Simplications-Farben:

- Primärfarbe: `#BF4254`
- Dunkel: `#2C2E35`
- Grau: `#84888E`
- Hintergrund: `#F7F7F8`

## Anpassungen

### Anzahl der Karten

Das Spiel passt sich automatisch an die Anzahl der Einträge im `gameData` Array an. Für ein ausgewogenes Spiel werden 4-8 Paare empfohlen.

### Spielaufbau

Das Spielfeld ist in zwei Bereiche unterteilt:

- **Geschichten** (linke Seite) - Story-Karten
- **Daten** (rechte Seite) - Graph-Karten

Dies verhindert, dass Spieler versehentlich zwei Karten des gleichen Typs auswählen.

### Responsive Design

Das Spiel ist vollständig responsiv und funktioniert auf:

- Desktop (2 Spalten pro Bereich)
- Tablet (1-2 Spalten pro Bereich)
- Smartphone (gestapelte Bereiche)

## Technologie

- HTML5
- CSS3 (Grid, Flexbox, Animationen)
- Vanilla JavaScript (ES6+)
- Keine externen Bibliotheken erforderlich

## Entwickelt von

[Simplications](https://simplications.tucmi.de) - Ein Projekt zur Aufklärung über Implikationen von Sensordaten für Privatheit im Zuhause.

Gefördert durch das BMFTR im Rahmen des Förderprogramms "Vernetzung und Sicherheit digitaler Systeme".
