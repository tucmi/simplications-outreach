// Konsens-Protokoll – Smart Home
// Vorlage für haushaltsinterne Nutzungsvereinbarungen smarter Geräte und Sensoren

const PROTOCOL_DEVICES = [
    {
        name: 'Smart Speaker / Sprachassistent',
        type: 'Sprachsteuerung',
        location: 'Wohnzimmer / Küche',
        dataTypes: ['Sprachaufnahmen', 'Nutzungszeiten', 'Routinen'],
        defaultAllowed: true,
        defaultLocal: false,
        defaultNoThirdParty: false
    },
    {
        name: 'Smart-TV',
        type: 'Entertainment',
        location: 'Wohnzimmer',
        dataTypes: ['Nutzungsverhalten', 'Sprachbefehle', 'Gerätekennung'],
        defaultAllowed: true,
        defaultLocal: false,
        defaultNoThirdParty: false
    },
    {
        name: 'Videotürklingel',
        type: 'Sicherheit / Kamera',
        location: 'Eingang',
        dataTypes: ['Video', 'Audio', 'Bewegung', 'Besuchszeiten'],
        defaultAllowed: true,
        defaultLocal: false,
        defaultNoThirdParty: true
    },
    {
        name: 'Smartes Türschloss',
        type: 'Zugangskontrolle',
        location: 'Eingang',
        dataTypes: ['Öffnungszeiten', 'Nutzerkonten', 'Protokolle'],
        defaultAllowed: true,
        defaultLocal: true,
        defaultNoThirdParty: true
    },
    {
        name: 'CO₂-Sensor',
        type: 'Luftqualität',
        location: 'Schlafzimmer',
        dataTypes: ['CO₂-Werte', 'Temperatur', 'Anwesenheit indirekt'],
        defaultAllowed: true,
        defaultLocal: true,
        defaultNoThirdParty: true
    },
    {
        name: 'Bewegungssensor',
        type: 'Automation / Sicherheit',
        location: 'Flur / Eingang',
        dataTypes: ['Bewegungszeiten', 'Anwesenheitsmuster'],
        defaultAllowed: true,
        defaultLocal: true,
        defaultNoThirdParty: true
    },
    {
        name: 'Lichtsensor',
        type: 'Automation / Komfort',
        location: 'Wohnzimmer / Schlafzimmer',
        dataTypes: ['Lichtintensität', 'Nutzungszeiten', 'Schlafmuster indirekt'],
        defaultAllowed: true,
        defaultLocal: true,
        defaultNoThirdParty: true
    },
    {
        name: 'Temperatur- & Luftfeuchtigkeitssensor',
        type: 'Klima / Komfort',
        location: 'Bad / Küche / Schlafzimmer',
        dataTypes: ['Temperatur', 'Luftfeuchtigkeit', 'Routinemuster'],
        defaultAllowed: true,
        defaultLocal: true,
        defaultNoThirdParty: true
    },
    {
        name: 'Lautstärkesensor',
        type: 'Klima / Ruhe',
        location: 'Wohnzimmer / Kinderzimmer',
        dataTypes: ['Lautstärkepegel', 'Aktivitätszeiten'],
        defaultAllowed: true,
        defaultLocal: true,
        defaultNoThirdParty: true
    },
    {
        name: 'Smarte Steckdose',
        type: 'Energie / Automation',
        location: 'Küche / Wohnzimmer',
        dataTypes: ['Schaltzeiten', 'Energieverbrauch', 'Automationen'],
        defaultAllowed: true,
        defaultLocal: false,
        defaultNoThirdParty: true
    },
    {
        name: 'Sleep Tracker / Smartwatch',
        type: 'Gesundheit / Wearable',
        location: 'Schlafzimmer',
        dataTypes: ['Schlafdaten', 'Herzfrequenz', 'Bewegung'],
        defaultAllowed: true,
        defaultLocal: false,
        defaultNoThirdParty: false
    },
    {
        name: 'Sicherheitskamera (innen)',
        type: 'Sicherheit / Kamera',
        location: 'Eingang / Flur',
        dataTypes: ['Video', 'Bewegung', 'Zeitstempel'],
        defaultAllowed: false,
        defaultLocal: true,
        defaultNoThirdParty: true
    }
];

const DEFAULT_MEMBER_COUNT = 4;

// ============================================
// Meta section (date + address)
// ============================================
function buildMetaSection() {
    const section = createElement('section', {
        class: 'meta-card',
        'aria-labelledby': 'metaTitle'
    });

    section.appendChild(createElement('h2', { id: 'metaTitle' }, 'Protokolldaten'));

    const grid = createElement('div', { class: 'meta-grid' });

    const dateGroup = createElement('div', { class: 'meta-field' });
    const dateLabel = createElement('label', { for: 'protocolDate', class: 'meta-label' }, 'Datum der Vereinbarung');
    const dateInput = createElement('input', {
        type: 'date',
        id: 'protocolDate',
        class: 'meta-input',
        'aria-label': 'Datum der Vereinbarung'
    });
    dateGroup.appendChild(dateLabel);
    dateGroup.appendChild(dateInput);

    const addressGroup = createElement('div', { class: 'meta-field' });
    const addressLabel = createElement('label', { for: 'protocolAddress', class: 'meta-label' }, 'Haushalt / Adresse (optional)');
    const addressInput = createElement('input', {
        type: 'text',
        id: 'protocolAddress',
        class: 'meta-input',
        'aria-label': 'Adresse des Haushalts'
    });
    addressInput.placeholder = 'z.\u00A0B. Musterstraße 1, 01234 Musterstadt';
    addressGroup.appendChild(addressLabel);
    addressGroup.appendChild(addressInput);

    grid.appendChild(dateGroup);
    grid.appendChild(addressGroup);
    section.appendChild(grid);

    return section;
}

// ============================================
// Members section
// ============================================
function buildMemberCard(index) {
    const card = createElement('div', { class: 'member-card' });

    card.appendChild(createElement('div', { class: 'member-number' }, String(index + 1)));

    const nameGroup = createElement('div', { class: 'member-field' });
    const nameId = `memberName${index}`;
    nameGroup.appendChild(createElement('label', { for: nameId, class: 'field-label' }, 'Name'));
    const nameInput = createElement('input', {
        type: 'text',
        id: nameId,
        class: 'field-input',
        'aria-label': `Name Haushaltsmitglied ${index + 1}`
    });
    nameInput.placeholder = 'Name eintragen';
    nameGroup.appendChild(nameInput);

    const roleGroup = createElement('div', { class: 'member-field' });
    const roleId = `memberRole${index}`;
    roleGroup.appendChild(createElement('label', { for: roleId, class: 'field-label' }, 'Rolle'));
    const roleInput = createElement('input', {
        type: 'text',
        id: roleId,
        class: 'field-input',
        'aria-label': `Rolle Haushaltsmitglied ${index + 1}`
    });
    roleInput.placeholder = 'z.\u00A0B. Mieter:in, Kind';
    roleGroup.appendChild(roleInput);

    card.appendChild(nameGroup);
    card.appendChild(roleGroup);

    return card;
}

function buildMembersSection() {
    const section = createElement('section', {
        class: 'members-card',
        'aria-labelledby': 'membersTitle'
    });

    const header = createElement('div', { class: 'section-header' });
    header.appendChild(createElement('h2', { id: 'membersTitle' }, 'Haushaltsmitglieder'));
    header.appendChild(createElement('p', { class: 'section-desc' }, 'Tragt alle Personen ein, die von den smarten Geräten betroffen sind und an dieser Vereinbarung teilnehmen.'));
    section.appendChild(header);

    const grid = createElement('div', { class: 'members-grid' });
    for (let i = 0; i < DEFAULT_MEMBER_COUNT; i++) {
        grid.appendChild(buildMemberCard(i));
    }
    section.appendChild(grid);

    return section;
}

// ============================================
// Device table
// ============================================
function buildDataPills(dataTypes) {
    const container = createElement('div', { class: 'data-pill-list' });
    dataTypes.forEach(type => {
        container.appendChild(createElement('span', { class: 'data-mini-pill' }, type));
    });
    return container;
}

function buildCheckboxCell(id, checked) {
    const td = createElement('td', { class: 'checkbox-cell' });
    const label = createElement('label', { class: 'checkbox-wrapper', for: id });
    const input = createElement('input', {
        type: 'checkbox',
        id: id,
        class: 'protocol-checkbox'
    });
    input.checked = checked;
    label.appendChild(input);
    td.appendChild(label);
    return td;
}

function buildDeviceRow(device, index) {
    const tr = createElement('tr', {});

    tr.appendChild(createElement('td', { class: 'row-num' }, String(index + 1)));

    const deviceTd = createElement('td', { class: 'device-cell' });
    deviceTd.appendChild(createElement('div', { class: 'device-name' }, device.name));
    deviceTd.appendChild(createElement('span', { class: 'type-pill' }, device.type));
    tr.appendChild(deviceTd);

    tr.appendChild(createElement('td', { class: 'location-cell' }, device.location));

    const dataTd = createElement('td', { class: 'data-cell' });
    dataTd.appendChild(buildDataPills(device.dataTypes));
    tr.appendChild(dataTd);

    tr.appendChild(buildCheckboxCell(`allowed_${index}`, device.defaultAllowed));
    tr.appendChild(buildCheckboxCell(`local_${index}`, device.defaultLocal));
    tr.appendChild(buildCheckboxCell(`nothird_${index}`, device.defaultNoThirdParty));

    const notesTd = createElement('td', { class: 'notes-cell' });
    const notesInput = createElement('input', {
        type: 'text',
        class: 'notes-input',
        'aria-label': `Besondere Vereinbarung für ${device.name}`
    });
    notesInput.placeholder = 'Besondere Absprachen...';
    notesTd.appendChild(notesInput);
    tr.appendChild(notesTd);

    return tr;
}

function buildDeviceTable() {
    const section = createElement('section', {
        class: 'devices-card',
        'aria-labelledby': 'devicesTitle'
    });

    const header = createElement('div', { class: 'section-header' });
    header.appendChild(createElement('h2', { id: 'devicesTitle' }, 'Geräte und Vereinbarungen'));
    header.appendChild(createElement('p', { class: 'section-desc' }, 'Geht gemeinsam durch, welche Geräte im Haushalt vorhanden sind. Setzt Häkchen für eure Vereinbarungen und notiert besondere Absprachen.'));
    section.appendChild(header);

    const legendData = [
        { label: 'Nutzung erlaubt', desc: 'Das Gerät darf im Haushalt genutzt werden' },
        { label: 'Nur lokal', desc: 'Daten bleiben auf dem Gerät bzw. im Heimnetz' },
        { label: 'Keine Drittanbieter', desc: 'Keine Weitergabe an externe Dienste oder Anbieter' }
    ];
    const legend = createElement('div', { class: 'table-legend' });
    legendData.forEach(item => {
        const li = createElement('div', { class: 'legend-item' });
        li.appendChild(createElement('span', { class: 'legend-checkbox-box', 'aria-hidden': 'true' }));
        li.appendChild(createElement('strong', {}, item.label));
        li.appendChild(document.createTextNode(' \u2014 '));
        li.appendChild(createElement('span', { class: 'legend-desc' }, item.desc));
        legend.appendChild(li);
    });
    section.appendChild(legend);

    const wrapper = createElement('div', { class: 'device-table-wrapper' });
    const table = createElement('table', { class: 'protocol-table' });

    const thead = createElement('thead');
    const headerRow = createElement('tr');
    ['#', 'Gerät', 'Standort', 'Erhobene Daten', 'Nutzung erlaubt', 'Nur lokal', 'Keine Drittanbieter', 'Besondere Vereinbarung'].forEach(h => {
        headerRow.appendChild(createElement('th', { scope: 'col' }, h));
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = createElement('tbody');
    PROTOCOL_DEVICES.forEach((device, index) => {
        tbody.appendChild(buildDeviceRow(device, index));
    });
    table.appendChild(tbody);
    wrapper.appendChild(table);
    section.appendChild(wrapper);

    return section;
}

// ============================================
// Notes section
// ============================================
function buildNotesSection() {
    const section = createElement('section', {
        class: 'notes-card',
        'aria-labelledby': 'notesTitle'
    });

    section.appendChild(createElement('h2', { id: 'notesTitle' }, 'Weitere Vereinbarungen und Anmerkungen'));
    section.appendChild(createElement('p', { class: 'section-desc' }, 'Platz für zusätzliche Absprachen, die nicht in der Geräteliste abgebildet sind – z.\u00A0B. Regeln für Gäste, Löschfristen oder geplante Änderungen.'));

    const textarea = createElement('textarea', {
        id: 'protocolNotes',
        class: 'notes-textarea',
        rows: '4',
        'aria-label': 'Weitere Vereinbarungen und Anmerkungen'
    });
    textarea.placeholder = 'Weitere Vereinbarungen, Ausnahmen oder Hinweise...';
    section.appendChild(textarea);

    return section;
}

// ============================================
// Signatures section
// ============================================
function buildSignatureCard(index) {
    const card = createElement('div', { class: 'signature-card' });
    card.appendChild(createElement('div', { class: 'sig-label' }, `Person ${index + 1}`));
    card.appendChild(createElement('div', { class: 'sig-line' }));
    card.appendChild(createElement('div', { class: 'sig-hint' }, 'Unterschrift, Datum'));
    return card;
}

function buildSignaturesSection() {
    const section = createElement('section', {
        class: 'signatures-card',
        'aria-labelledby': 'signaturesTitle'
    });

    const header = createElement('div', { class: 'section-header' });
    header.appendChild(createElement('h2', { id: 'signaturesTitle' }, 'Unterschriften'));
    header.appendChild(createElement('p', { class: 'section-desc' }, 'Mit der Unterschrift bestätigen alle Beteiligten, dass sie die Vereinbarungen kennen und ihnen zustimmen.'));
    section.appendChild(header);

    const grid = createElement('div', { class: 'signatures-grid' });
    for (let i = 0; i < DEFAULT_MEMBER_COUNT; i++) {
        grid.appendChild(buildSignatureCard(i));
    }
    section.appendChild(grid);

    return section;
}

// ============================================
// Init
// ============================================
function initProtocolPage() {
    const content = document.getElementById('protocolContent');

    content.appendChild(buildMetaSection());
    content.appendChild(buildMembersSection());
    content.appendChild(buildDeviceTable());
    content.appendChild(buildNotesSection());
    content.appendChild(buildSignaturesSection());

    const printBtn = document.getElementById('printProtocolButton');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProtocolPage);
} else {
    initProtocolPage();
}
