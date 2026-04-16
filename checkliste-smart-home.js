const CHECKLIST_ROOMS = [
    {
        room: 'Wohnzimmer',
        note: 'Hier stehen oft Geräte mit Mikrofonen, Kameras oder detaillierten Nutzungsprofilen.',
        devices: [
            {
                name: 'Smart-TV',
                type: 'Entertainment',
                data: ['Nutzungsverhalten', 'Sender/Apps', 'Sprachbefehle', 'Gerätekennung'],
                storage: ['lokal', 'cloud', 'anbieter'],
                transfer: ['TV-App', 'Hersteller-Cloud', 'Streaming-Dienste'],
                audit: ['Mikrofon/Kamera deaktivierbar?', 'Werbe-Tracking abschaltbar?', 'Verlauf löschbar?']
            },
            {
                name: 'Smarter Lautsprecher',
                type: 'Sprachassistenz',
                data: ['Sprachbefehle', 'Nutzungszeiten', 'Haushaltsroutinen'],
                storage: ['cloud', 'anbieter'],
                transfer: ['Sprachdienst', 'Verknüpfte Smart-Home-Clouds'],
                audit: ['Wird ständig mitgehört?', 'Welche Routinen sind aktiviert?', 'Können Sprachaufnahmen gelöscht werden?']
            }
        ]
    },
    {
        room: 'Küche',
        note: 'In der Küche entstehen oft Daten über Routinen, Temperaturen und Energieverbrauch.',
        devices: [
            {
                name: 'Smarter Kühlschrank',
                type: 'Haushaltsgerät',
                data: ['Temperatur', 'Türöffnungen', 'Energieverbrauch'],
                storage: ['lokal', 'cloud'],
                transfer: ['Hersteller-App', 'Wartungsdienst'],
                audit: ['Braucht das Gerät wirklich eine Cloud?', 'Wer sieht Türöffnungen?', 'Sind Benachrichtigungen nötig?']
            },
            {
                name: 'Sprachgesteuerte Steckdose',
                type: 'Energie / Automation',
                data: ['Schaltzeiten', 'Energieverbrauch', 'Automationen'],
                storage: ['app', 'cloud'],
                transfer: ['Steckdosen-App', 'Sprachassistenz'],
                audit: ['Welche Routinen sind verknüpft?', 'Bleiben Schaltpläne lokal?', 'Ist Fernzugriff aktiviert?']
            }
        ]
    },
    {
        room: 'Schlafzimmer',
        note: 'Geräte in privaten Rückzugsräumen verdienen besondere Zurückhaltung bei Datenerhebung und Freigaben.',
        devices: [
            {
                name: 'Sleep Tracker / Smartwatch',
                type: 'Gesundheit / Wearable',
                data: ['Schlafdauer', 'Bewegung', 'Herzfrequenz'],
                storage: ['app', 'cloud'],
                transfer: ['Hersteller-App', 'Gesundheitsplattformen'],
                audit: ['Wer sieht Gesundheitsdaten?', 'Ist Datenteilung mit Dritten aktiviert?', 'Wie lange bleiben die Daten gespeichert?']
            },
            {
                name: 'Smarte Lampe',
                type: 'Licht / Komfort',
                data: ['Nutzungszeiten', 'Automationen', 'Raumpräsenz indirekt'],
                storage: ['lokal', 'app'],
                transfer: ['Licht-App', 'Bridge / Hub'],
                audit: ['Ist Präsenz aus Schaltmustern ableitbar?', 'Braucht die Lampe Internetzugang?', 'Sind Freigaben für Gäste aktiv?']
            }
        ]
    },
    {
        room: 'Flur / Eingangsbereich',
        note: 'Geräte am Eingang erfassen oft besonders sensible Bewegungs- und Besuchsdaten.',
        devices: [
            {
                name: 'Videotürklingel',
                type: 'Sicherheit / Kamera',
                data: ['Video', 'Audio', 'Zeitpunkte von Besuchen', 'Bewegung'],
                storage: ['cloud', 'anbieter'],
                transfer: ['Kamera-App', 'Hersteller-Cloud', 'Push-Dienst'],
                audit: ['Wer wird mit erfasst?', 'Wie lange werden Videos gespeichert?', 'Ist Daueraufzeichnung aktiviert?']
            },
            {
                name: 'Smartes Türschloss',
                type: 'Zugangskontrolle',
                data: ['Öffnungsprotokolle', 'Nutzerkonten', 'Zutrittszeiten'],
                storage: ['lokal', 'app', 'cloud'],
                transfer: ['Schloss-App', 'Remote-Zugriff'],
                audit: ['Wer hat Adminrechte?', 'Gibt es alte Gastzugänge?', 'Ist der Fernzugriff nötig?']
            }
        ]
    }
];

function createPillList(items, className, classResolver) {
    const container = createElement('div', { class: 'pill-list' });

    items.forEach(item => {
        const extraClass = classResolver ? ` ${classResolver(item)}` : '';
        container.appendChild(createElement('span', { class: `${className}${extraClass}` }, item));
    });

    return container;
}

function buildAuditList(items) {
    const list = createElement('ul', { class: 'audit-list' });

    items.forEach(item => {
        list.appendChild(createElement('li', {}, [
            createElement('span', { class: 'audit-pill' }, 'Prüfen'),
            createElement('span', {}, item)
        ]));
    });

    return list;
}

function storageClass(item) {
    return item.toLowerCase();
}

function transferClass(item) {
    const normalized = item.toLowerCase();

    if (normalized.includes('app')) {
        return 'app';
    }

    if (normalized.includes('cloud')) {
        return 'cloud';
    }

    if (normalized.includes('hersteller') || normalized.includes('anbieter')) {
        return 'vendor';
    }

    return 'external';
}

function buildDeviceRow(device) {
    return createElement('tr', {}, [
        createElement('td', {}, [
            createElement('div', { class: 'device-name' }, device.name),
            createElement('div', { class: 'device-type' }, device.type)
        ]),
        createElement('td', {}, [createPillList(device.data, 'data-pill')]),
        createElement('td', {}, [createPillList(device.storage, 'status-pill', storageClass)]),
        createElement('td', {}, [createPillList(device.transfer, 'status-pill', transferClass)]),
        createElement('td', {}, [buildAuditList(device.audit)])
    ]);
}

function buildRoomSection(roomConfig) {
    const tableHead = createElement('thead', {}, [
        createElement('tr', {}, [
            createElement('th', { scope: 'col' }, 'Geraet'),
            createElement('th', { scope: 'col' }, 'Welche Daten werden erhoben?'),
            createElement('th', { scope: 'col' }, 'Wo werden Daten gespeichert?'),
            createElement('th', { scope: 'col' }, 'Wohin werden Daten gesendet?'),
            createElement('th', { scope: 'col' }, 'Prüffragen')
        ])
    ]);

    const tableBody = createElement('tbody');
    roomConfig.devices.forEach(device => {
        tableBody.appendChild(buildDeviceRow(device));
    });

    return createElement('section', { class: 'room-card' }, [
        createElement('h2', {}, roomConfig.room),
        createElement('p', { class: 'room-meta' }, roomConfig.note),
        createElement('div', { class: 'device-table-wrapper' }, [
            createElement('table', { class: 'device-table' }, [tableHead, tableBody])
        ])
    ]);
}

function initChecklistPage() {
    const roomGrid = document.getElementById('roomGrid');

    CHECKLIST_ROOMS.forEach(roomConfig => {
        roomGrid.appendChild(buildRoomSection(roomConfig));
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChecklistPage);
} else {
    initChecklistPage();
}