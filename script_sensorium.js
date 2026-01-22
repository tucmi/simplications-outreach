/* ============================================
   Sensorium Game - Data & Logic
   ============================================ */

// ============================================
// Data Structure
// ============================================

/**
 * Scenario Data Structure:
 * - id: Unique identifier
 * - title: Scenario title
 * - description: Context and setup
 * - userPerspective: What the user sees/thinks they share
 * - collectorPerspective: What is actually collected
 * - userDataPoints: List of data user is aware of
 * - collectorDataPoints: Complete list of collected data
 * - insight: Educational message explaining privacy implications
 */

const scenarios = [
    {
        id: 1,
        title: "Smart Speaker im Wohnzimmer",
        description: "Du nutzt deinen Smart Speaker, um Musik abzuspielen und das Wetter abzufragen. Ein praktischer Helfer für den Alltag.",
        userPerspective: {
            title: "Deine Wahrnehmung",
            items: [
                { icon: "🎵", label: "Musik-Befehle", description: "\"Spiel Jazz\"", highlight: false },
                { icon: "🌤️", label: "Wetter-Abfragen", description: "\"Wie wird das Wetter?\"", highlight: false },
                { icon: "⏰", label: "Timer & Wecker", description: "Erinnerungen setzen", highlight: false }
            ]
        },
        collectorPerspective: {
            title: "Was wirklich passiert",
            items: [
                { icon: "🎵", label: "Musik-Befehle", description: "\"Spiel Jazz\"", highlight: false },
                { icon: "🌤️", label: "Wetter-Abfragen", description: "\"Wie wird das Wetter?\"", highlight: false },
                { icon: "⏰", label: "Timer & Wecker", description: "Erinnerungen setzen", highlight: false },
                { icon: "🎤", label: "Audio-Aufnahmen", description: "Alle Sprachbefehle gespeichert", highlight: true },
                { icon: "🕐", label: "Nutzungszeiten", description: "Wann bist du zuhause?", highlight: true },
                { icon: "👥", label: "Stimmen-Analyse", description: "Wer spricht? Emotionen?", highlight: true },
                { icon: "📊", label: "Hörgewohnheiten", description: "Musikgeschmack, Interessen", highlight: true },
                { icon: "🌐", label: "IP & Standort", description: "Wo wohnst du genau?", highlight: true }
            ]
        },
        userDataPoints: [
            "Musik-Befehle",
            "Wetter-Abfragen",
            "Timer und Wecker"
        ],
        collectorDataPoints: [
            "Musik-Befehle",
            "Wetter-Abfragen",
            "Timer und Wecker",
            "Vollständige Audio-Aufnahmen aller Befehle",
            "Nutzungszeiten (Anwesenheitsprofil)",
            "Stimmen-Erkennung (Familienmitglieder)",
            "Emotionale Stimmungs-Analyse",
            "Musikgeschmack und Interessensprofil",
            "IP-Adresse und genauer Standort"
        ],
        insight: "Smart Speaker sammeln weit mehr als nur deine Sprachbefehle. Sie erstellen detaillierte Profile über deine Anwesenheit, Gewohnheiten und sogar deine Stimmung. Diese Daten werden oft mit anderen Diensten verknüpft und können ein sehr persönliches Bild von dir zeichnen."
    },
    {
        id: 2,
        title: "Smarter Rauchmelder in der Wohnung",
        description: "Dein smarter Rauchmelder sorgt für deine Sicherheit und sendet dir Benachrichtigungen aufs Smartphone. Ein beruhigendes Gefühl, geschützt zu sein.",
        userPerspective: {
            title: "Deine Wahrnehmung",
            items: [
                { icon: "🔥", label: "Rauch-Erkennung", description: "Warnung bei Rauch", highlight: false },
                { icon: "🔔", label: "Alarm-Benachrichtigung", description: "Push aufs Smartphone", highlight: false },
                { icon: "🔋", label: "Batterie-Status", description: "Akku-Stand anzeigen", highlight: false }
            ]
        },
        collectorPerspective: {
            title: "Was wirklich passiert",
            items: [
                { icon: "🔥", label: "Rauch-Erkennung", description: "Warnung bei Rauch", highlight: false },
                { icon: "🔔", label: "Alarm-Benachrichtigung", description: "Push aufs Smartphone", highlight: false },
                { icon: "🔋", label: "Batterie-Status", description: "Akku-Stand anzeigen", highlight: false },
                { icon: "🏠", label: "Anwesenheitserkennung", description: "Wann bist du zuhause?", highlight: true },
                { icon: "🌡️", label: "Raumklima-Profil", description: "Temperatur, Luftfeuchtigkeit", highlight: true },
                { icon: "📊", label: "Bewegungsmuster", description: "Welcher Raum, welche Zeit?", highlight: true },
                { icon: "🎤", label: "Geräusch-Analyse", description: "Gespräche, Aktivitäten", highlight: true },
                { icon: "📡", label: "WLAN-Scanning", description: "Alle Geräte im Netzwerk", highlight: true },
                { icon: "🕐", label: "Schlaf-Rhythmus", description: "Wann gehst du schlafen?", highlight: true }
            ]
        },
        userDataPoints: [
            "Rauch-Erkennung und Warnungen",
            "Alarm-Benachrichtigungen",
            "Batterie-Status"
        ],
        collectorDataPoints: [
            "Rauch-Erkennung und Warnungen",
            "Alarm-Benachrichtigungen",
            "Batterie-Status",
            "Anwesenheitsprofil (wann ist jemand zuhause)",
            "Raumklima-Daten (Temperatur, Luftfeuchtigkeit)",
            "Bewegungsmuster zwischen Räumen",
            "Geräusch-Analyse (Stimmen, Aktivitäten)",
            "WLAN-Netzwerk Scanning (alle verbundenen Geräte)",
            "Schlaf- und Wach-Rhythmus",
            "Langzeit-Verhaltensprofile"
        ],
        insight: "Smarte Rauchmelder sind permanent aktiv und können weit mehr erfassen als nur Rauch. Über Sensoren für Temperatur, Luftqualität und Geräusche erstellen sie detaillierte Anwesenheits- und Verhaltensprofile. Sie wissen, wann du schläfst, wie viele Personen im Haushalt leben und können sogar Gespräche aufzeichnen."
    },
    {
        id: 3,
        title: "Smart TV beim Streaming",
        description: "Du streamst deine Lieblingsserien auf deinem Smart TV. Perfekt für entspannte Abende auf dem Sofa.",
        userPerspective: {
            title: "Deine Wahrnehmung",
            items: [
                { icon: "🎬", label: "Filme & Serien", description: "Was du schaust", highlight: false },
                { icon: "⭐", label: "Bewertungen", description: "Likes und Favoriten", highlight: false },
                { icon: "🔊", label: "Lautstärke", description: "Deine Einstellungen", highlight: false }
            ]
        },
        collectorPerspective: {
            title: "Was wirklich passiert",
            items: [
                { icon: "🎬", label: "Filme & Serien", description: "Was du schaust", highlight: false },
                { icon: "⭐", label: "Bewertungen", description: "Likes und Favoriten", highlight: false },
                { icon: "🔊", label: "Lautstärke", description: "Deine Einstellungen", highlight: false },
                { icon: "⏯️", label: "Pausier-Verhalten", description: "Wann pausierst du? Warum?", highlight: true },
                { icon: "🕐", label: "Sehdauer & -zeiten", description: "Schläfst du vor dem TV ein?", highlight: true },
                { icon: "📺", label: "Alle Apps & Kanäle", description: "YouTube, Browser, Gaming", highlight: true },
                { icon: "📷", label: "Kamera-Nutzung", description: "Wer sitzt vor dem TV?", highlight: true },
                { icon: "🎤", label: "Mikrofon-Daten", description: "Gespräche im Raum", highlight: true },
                { icon: "🌐", label: "Netzwerk-Traffic", description: "Alle anderen Smart-Geräte", highlight: true }
            ]
        },
        userDataPoints: [
            "Gesehene Filme und Serien",
            "Bewertungen und Favoriten",
            "Lautstärke-Einstellungen"
        ],
        collectorDataPoints: [
            "Gesehene Filme und Serien",
            "Bewertungen und Favoriten",
            "Lautstärke-Einstellungen",
            "Exaktes Pausier- und Skip-Verhalten",
            "Sehdauer und Einschlaf-Muster",
            "Nutzung aller Apps (Browser, YouTube, Games)",
            "Kamera-Aufnahmen (bei aktivierter Kamera)",
            "Mikrofon-Aufzeichnungen für Sprachsteuerung",
            "Netzwerk-Scanning (andere Geräte im Haushalt)",
            "Werbe-ID und Tracking über Apps hinweg"
        ],
        insight: "Smart TVs sind oft die zentrale Sammelstelle für Haushalts-Daten. Sie tracken nicht nur dein Sehverhalten bis ins kleinste Detail, sondern scannen auch dein gesamtes Heimnetzwerk und können über Kamera und Mikrofon sogar physische Aktivitäten im Raum erfassen."
    }
];

// ============================================
// Game State
// ============================================

let currentScenarioIndex = 0;
let currentPerspective = 'user'; // 'user' or 'collector'
let hasViewedCollectorPerspective = false;

// ============================================
// DOM Elements
// ============================================

const elements = {
    currentScenario: document.getElementById('currentScenario'),
    totalScenarios: document.getElementById('totalScenarios'),
    scenarioTitle: document.getElementById('scenarioTitle'),
    scenarioDescription: document.getElementById('scenarioDescription'),
    userPerspectiveBtn: document.getElementById('userPerspectiveBtn'),
    collectorPerspectiveBtn: document.getElementById('collectorPerspectiveBtn'),
    userView: document.getElementById('userView'),
    collectorView: document.getElementById('collectorView'),
    userViewContent: document.getElementById('userViewContent'),
    collectorViewContent: document.getElementById('collectorViewContent'),
    userDataList: document.getElementById('userDataList'),
    collectorDataList: document.getElementById('collectorDataList'),
    insightText: document.getElementById('insightText'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    progressFill: document.getElementById('progressFill')
};

// ============================================
// Initialization
// ============================================

function init() {
    elements.totalScenarios.textContent = scenarios.length;
    
    // Event Listeners
    elements.userPerspectiveBtn.addEventListener('click', () => switchPerspective('user'));
    elements.collectorPerspectiveBtn.addEventListener('click', () => switchPerspective('collector'));
    elements.prevBtn.addEventListener('click', previousScenario);
    elements.nextBtn.addEventListener('click', nextScenario);
    
    // Touch-friendly: Add touch event listeners
    addTouchSupport();
    
    // Load first scenario
    loadScenario(currentScenarioIndex);
}

// ============================================
// Scenario Loading
// ============================================

function loadScenario(index) {
    const scenario = scenarios[index];
    hasViewedCollectorPerspective = false;
    
    // Update scenario info
    elements.currentScenario.textContent = index + 1;
    elements.scenarioTitle.textContent = scenario.title;
    elements.scenarioDescription.textContent = scenario.description;
    
    // Render perspectives first
    renderPerspectiveView('user', scenario);
    renderPerspectiveView('collector', scenario);
    
    // Always reset to user perspective (force update)
    currentPerspective = 'collector'; // Set to opposite first to force the switch
    switchPerspective('user', false);
    
    // Render data comparison
    renderDataComparison(scenario);
    
    // Update insight (hidden until collector view)
    elements.insightText.textContent = "Wechsle zur Datensammler-Sicht, um mehr zu erfahren.";
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update progress bar
    updateProgressBar();
    
    // Add fade-in animation
    document.querySelector('.scenario-info').classList.remove('fade-in');
    setTimeout(() => {
        document.querySelector('.scenario-info').classList.add('fade-in');
    }, 10);
}

// ============================================
// Perspective Rendering
// ============================================

function renderPerspectiveView(perspective, scenario) {
    const data = perspective === 'user' ? scenario.userPerspective : scenario.collectorPerspective;
    const contentElement = perspective === 'user' ? elements.userViewContent : elements.collectorViewContent;
    
    // Create data items grid
    const gridHTML = `
        <div class="data-items-grid">
            ${data.items.map(item => `
                <div class="data-item ${item.highlight ? 'highlight' : ''}">
                    <div class="data-item-icon">${item.icon}</div>
                    <div class="data-item-label">${item.label}</div>
                    <div class="data-item-description">${item.description}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    contentElement.innerHTML = gridHTML;
}

function renderDataComparison(scenario) {
    // User data points
    elements.userDataList.innerHTML = scenario.userDataPoints
        .map(point => `<li>${point}</li>`)
        .join('');
    
    // Collector data points (highlight extra items)
    elements.collectorDataList.innerHTML = scenario.collectorDataPoints
        .map(point => {
            const isExtra = !scenario.userDataPoints.includes(point);
            return `<li class="${isExtra ? 'extra-data' : ''}">${point}</li>`;
        })
        .join('');
}

// ============================================
// Perspective Switching
// ============================================

function switchPerspective(perspective, animate = true) {
    if (currentPerspective === perspective) return;
    
    currentPerspective = perspective;
    
    // Update button states
    elements.userPerspectiveBtn.classList.toggle('active', perspective === 'user');
    elements.collectorPerspectiveBtn.classList.toggle('active', perspective === 'collector');
    
    // Update view visibility
    elements.userView.classList.toggle('active', perspective === 'user');
    elements.collectorView.classList.toggle('active', perspective === 'collector');
    
    // Show insight when switching to collector perspective
    if (perspective === 'collector' && !hasViewedCollectorPerspective) {
        hasViewedCollectorPerspective = true;
        const scenario = scenarios[currentScenarioIndex];
        setTimeout(() => {
            elements.insightText.textContent = scenario.insight;
            document.querySelector('.insights-section').classList.add('fade-in');
        }, 500);
    }
}

// ============================================
// Navigation
// ============================================

function nextScenario() {
    if (currentScenarioIndex < scenarios.length - 1) {
        currentScenarioIndex++;
        loadScenario(currentScenarioIndex);
        scrollToTop();
    }
}

function previousScenario() {
    if (currentScenarioIndex > 0) {
        currentScenarioIndex--;
        loadScenario(currentScenarioIndex);
        scrollToTop();
    }
}

function updateNavigationButtons() {
    elements.prevBtn.disabled = currentScenarioIndex === 0;
    
    if (currentScenarioIndex === scenarios.length - 1) {
        elements.nextBtn.innerHTML = '<span>🏁 Fertig</span>';
    } else {
        elements.nextBtn.innerHTML = '<span>Weiter →</span>';
    }
}

function updateProgressBar() {
    const progress = ((currentScenarioIndex + 1) / scenarios.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Touch Support
// ============================================

function addTouchSupport() {
    // Add touch event listeners for better mobile experience
    const buttons = document.querySelectorAll('.perspective-btn, .nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

// ============================================
// Export Functions for External Use
// ============================================

/**
 * Add a new scenario to the game
 * @param {Object} scenario - Scenario object following the data structure
 */
function addScenario(scenario) {
    scenarios.push(scenario);
    elements.totalScenarios.textContent = scenarios.length;
}

/**
 * Get all scenarios
 * @returns {Array} Array of all scenario objects
 */
function getAllScenarios() {
    return scenarios;
}

/**
 * Reset game to first scenario
 */
function resetGame() {
    currentScenarioIndex = 0;
    loadScenario(0);
    scrollToTop();
}

// ============================================
// Start Game
// ============================================

document.addEventListener('DOMContentLoaded', init);

// Export functions for potential external use
window.SensoriumGame = {
    addScenario,
    getAllScenarios,
    resetGame
};
