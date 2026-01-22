// Game Data - Add your stories and graphs here
const gameData = [
    {
        id: 1,
        storyTitle: "Temperaturanstieg",
        storyText: "Die Temperatur in einem Raum steigt kontinuierlich über den Tag an, bis die Klimaanlage eingeschaltet wird.",
        graphImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F7F7F8'/%3E%3Ctext x='200' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='%23BF4254'%3ETemperatur im Tagesverlauf%3C/text%3E%3Cpath d='M 50 250 L 100 220 L 150 190 L 200 160 L 250 140 L 280 100 L 300 200 L 350 200' stroke='%23BF4254' stroke-width='3' fill='none'/%3E%3Ccircle cx='280' cy='100' r='5' fill='%23BF4254'/%3E%3Ctext x='290' y='95' font-size='12' fill='%232C2E35'%3EKlima an%3C/text%3E%3Cline x1='50' y1='260' x2='350' y2='260' stroke='%2384888E' stroke-width='1'/%3E%3Cline x1='50' y1='260' x2='50' y2='50' stroke='%2384888E' stroke-width='1'/%3E%3Ctext x='20' y='155' font-size='12' fill='%2384888E'%3E°C%3C/text%3E%3Ctext x='180' y='285' font-size='12' fill='%2384888E'%3EZeit%3C/text%3E%3C/svg%3E"
    },
    {
        id: 2,
        storyTitle: "Bewegungsmuster",
        storyText: "Ein regelmäßiges Bewegungsmuster zeigt, dass jemand jeden Morgen um 7 Uhr aufsteht und das Haus verlässt.",
        graphImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F7F7F8'/%3E%3Ctext x='200' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='%23BF4254'%3EBewegungsaktivität%3C/text%3E%3Crect x='60' y='230' width='15' height='10' fill='%2384888E'/%3E%3Crect x='85' y='220' width='15' height='20' fill='%2384888E'/%3E%3Crect x='110' y='150' width='15' height='90' fill='%23BF4254'/%3E%3Crect x='135' y='240' width='15' height='0' fill='%2384888E'/%3E%3Crect x='160' y='240' width='15' height='0' fill='%2384888E'/%3E%3Crect x='185' y='230' width='15' height='10' fill='%2384888E'/%3E%3Crect x='210' y='210' width='15' height='30' fill='%2384888E'/%3E%3Crect x='235' y='180' width='15' height='60' fill='%2384888E'/%3E%3Crect x='260' y='160' width='15' height='80' fill='%23BF4254'/%3E%3Crect x='285' y='220' width='15' height='20' fill='%2384888E'/%3E%3Crect x='310' y='230' width='15' height='10' fill='%2384888E'/%3E%3Cline x1='50' y1='245' x2='350' y2='245' stroke='%2384888E' stroke-width='1'/%3E%3Cline x1='50' y1='245' x2='50' y2='50' stroke='%2384888E' stroke-width='1'/%3E%3Ctext x='105' y='275' font-size='11' fill='%232C2E35'%3E7:00%3C/text%3E%3Ctext x='255' y='275' font-size='11' fill='%232C2E35'%3E18:00%3C/text%3E%3C/svg%3E"
    },
    {
        id: 3,
        storyTitle: "Stromverbrauch",
        storyText: "Der Stromverbrauch zeigt deutliche Spitzen am Morgen und Abend, wenn die meisten Geräte in Betrieb sind.",
        graphImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F7F7F8'/%3E%3Ctext x='200' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='%23BF4254'%3EStromverbrauch (24h)%3C/text%3E%3Cpath d='M 50 230 L 80 220 L 110 120 L 140 140 L 170 170 L 200 190 L 230 180 L 260 100 L 290 130 L 320 180 L 350 220' stroke='%23BF4254' stroke-width='3' fill='none'/%3E%3Cpath d='M 50 230 L 80 220 L 110 120 L 140 140 L 170 170 L 200 190 L 230 180 L 260 100 L 290 130 L 320 180 L 350 220 L 350 240 L 50 240 Z' fill='%23BF4254' opacity='0.2'/%3E%3Cline x1='50' y1='240' x2='350' y2='240' stroke='%2384888E' stroke-width='1'/%3E%3Cline x1='50' y1='240' x2='50' y2='50' stroke='%2384888E' stroke-width='1'/%3E%3Ctext x='15' y='150' font-size='12' fill='%2384888E'%3EkWh%3C/text%3E%3Ctext x='100' y='270' font-size='11' fill='%232C2E35'%3EMorgen%3C/text%3E%3Ctext x='250' y='270' font-size='11' fill='%232C2E35'%3EAbend%3C/text%3E%3C/svg%3E"
    },
    {
        id: 4,
        storyTitle: "Luftfeuchtigkeit",
        storyText: "Nach dem Duschen steigt die Luftfeuchtigkeit im Badezimmer schnell an und normalisiert sich dann wieder.",
        graphImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F7F7F8'/%3E%3Ctext x='200' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='%23BF4254'%3ELuftfeuchtigkeit%3C/text%3E%3Cpath d='M 50 200 L 80 200 L 100 80 L 130 85 L 160 95 L 190 110 L 220 130 L 250 150 L 280 170 L 310 185 L 340 195 L 350 200' stroke='%23BF4254' stroke-width='3' fill='none'/%3E%3Ccircle cx='100' cy='80' r='5' fill='%23BF4254'/%3E%3Ctext x='110' y='75' font-size='11' fill='%232C2E35'%3EDuschen%3C/text%3E%3Cline x1='50' y1='240' x2='350' y2='240' stroke='%2384888E' stroke-width='1'/%3E%3Cline x1='50' y1='240' x2='50' y2='50' stroke='%2384888E' stroke-width='1'/%3E%3Ctext x='20' y='150' font-size='11' fill='%2384888E'%3E%25%3C/text%3E%3Ctext x='180' y='270' font-size='12' fill='%2384888E'%3EZeit%3C/text%3E%3Cline x1='50' y1='200' x2='350' y2='200' stroke='%2384888E' stroke-width='1' stroke-dasharray='5,5' opacity='0.5'/%3E%3Ctext x='355' y='205' font-size='10' fill='%2384888E'%3ENormal%3C/text%3E%3C/svg%3E"
    },
    {
        id: 5,
        storyTitle: "Lichtintensität",
        storyText: "Die Lichtintensität folgt dem natürlichen Tagesrhythmus mit einem Maximum zur Mittagszeit.",
        graphImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F7F7F8'/%3E%3Ctext x='200' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='%23BF4254'%3ELichtintensität%3C/text%3E%3Cpath d='M 50 240 Q 100 220, 120 180 Q 150 100, 200 70 Q 250 100, 280 180 Q 300 220, 350 240' stroke='%23BF4254' stroke-width='3' fill='none'/%3E%3Cpath d='M 50 240 Q 100 220, 120 180 Q 150 100, 200 70 Q 250 100, 280 180 Q 300 220, 350 240 L 350 245 L 50 245 Z' fill='%23BF4254' opacity='0.15'/%3E%3Ccircle cx='200' cy='70' r='5' fill='%23BF4254'/%3E%3Ctext x='210' y='65' font-size='11' fill='%232C2E35'%3EMittag%3C/text%3E%3Cline x1='50' y1='245' x2='350' y2='245' stroke='%2384888E' stroke-width='1'/%3E%3Cline x1='50' y1='245' x2='50' y2='50' stroke='%2384888E' stroke-width='1'/%3E%3Ctext x='15' y='150' font-size='11' fill='%2384888E'%3ELux%3C/text%3E%3Ctext x='40' y='270' font-size='10' fill='%2384888E'%3E6:00%3C/text%3E%3Ctext x='185' y='270' font-size='10' fill='%2384888E'%3E12:00%3C/text%3E%3Ctext x='330' y='270' font-size='10' fill='%2384888E'%3E18:00%3C/text%3E%3C/svg%3E"
    },
    {
        id: 6,
        storyTitle: "Wasserverbrauch",
        storyText: "Hoher Wasserverbrauch am Morgen und Abend deutet auf Körperpflege und Kochen hin.",
        graphImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F7F7F8'/%3E%3Ctext x='200' y='30' text-anchor='middle' font-size='16' font-weight='bold' fill='%23BF4254'%3EWasserverbrauch%3C/text%3E%3Crect x='70' y='220' width='25' height='20' fill='%2384888E' rx='2'/%3E%3Crect x='105' y='110' width='25' height='130' fill='%23BF4254' rx='2'/%3E%3Crect x='140' y='200' width='25' height='40' fill='%2384888E' rx='2'/%3E%3Crect x='175' y='220' width='25' height='20' fill='%2384888E' rx='2'/%3E%3Crect x='210' y='210' width='25' height='30' fill='%2384888E' rx='2'/%3E%3Crect x='245' y='130' width='25' height='110' fill='%23BF4254' rx='2'/%3E%3Crect x='280' y='200' width='25' height='40' fill='%2384888E' rx='2'/%3E%3Crect x='315' y='230' width='25' height='10' fill='%2384888E' rx='2'/%3E%3Cline x1='50' y1='245' x2='360' y2='245' stroke='%2384888E' stroke-width='1'/%3E%3Cline x1='50' y1='245' x2='50' y2='50' stroke='%2384888E' stroke-width='1'/%3E%3Ctext x='20' y='150' font-size='11' fill='%2384888E'%3EL%3C/text%3E%3Ctext x='100' y='275' font-size='10' fill='%232C2E35'%3EMorgen%3C/text%3E%3Ctext x='240' y='275' font-size='10' fill='%232C2E35'%3EAbend%3C/text%3E%3C/svg%3E"
    }
];

// Game State
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let gameStarted = false;

// DOM Elements
const storyBoard = document.getElementById('storyBoard');
const dataBoard = document.getElementById('dataBoard');
const newGameButton = document.getElementById('newGameButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const restartButton = document.getElementById('restartButton');
const attemptsDisplay = document.getElementById('attempts');
const matchesDisplay = document.getElementById('matches');
const gameMessage = document.getElementById('gameMessage');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');

// Initialize the game
function init() {
    newGameButton.addEventListener('click', startNewGame);
    fullscreenButton.addEventListener('click', toggleFullscreen);
    restartButton.addEventListener('click', startNewGame);
    // Auto-start the game
    startNewGame();
}

// Start a new game
function startNewGame() {
    if (!gameData || gameData.length === 0) {
        showMessage('Keine Daten', 'Bitte füge Spieldaten in der script.js Datei hinzu.');
        return;
    }

    gameMessage.classList.add('hidden');
    gameStarted = true;
    matchedPairs = 0;
    attempts = 0;
    flippedCards = [];
    
    updateStats();
    createCards();
}

// Create and shuffle cards
function createCards() {
    storyBoard.innerHTML = '';
    dataBoard.innerHTML = '';
    cards = [];
    
    const storyCards = [];
    const graphCards = [];
    
    // Create pairs of cards (graph + story)
    gameData.forEach((item, index) => {
        // Graph card
        graphCards.push({
            id: `graph-${index}`,
            pairId: index,
            type: 'graph',
            data: item
        });
        
        // Story card
        storyCards.push({
            id: `story-${index}`,
            pairId: index,
            type: 'story',
            data: item
        });
    });
    
    // Shuffle each group separately
    shuffleArray(storyCards);
    shuffleArray(graphCards);
    
    // Store all cards
    cards = [...storyCards, ...graphCards];
    
    // Render story cards
    storyCards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        storyBoard.appendChild(cardElement);
    });
    
    // Render graph cards
    graphCards.forEach((card, index) => {
        const cardElement = createCardElement(card, index + storyCards.length);
        dataBoard.appendChild(cardElement);
    });
}

// Create a single card element
function createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.index = index;
    cardDiv.dataset.pairId = card.pairId;
    cardDiv.dataset.type = card.type;
    
    // Front face (hidden)
    const frontFace = document.createElement('div');
    frontFace.className = 'card-face card-front';
    
    // Back face (content)
    const backFace = document.createElement('div');
    backFace.className = `card-face card-back ${card.type}-card`;
    
    if (card.type === 'graph') {
        backFace.appendChild(createGraphContent(card.data));
    } else {
        backFace.appendChild(createStoryContent(card.data));
    }
    
    cardDiv.appendChild(frontFace);
    cardDiv.appendChild(backFace);
    
    cardDiv.addEventListener('click', () => handleCardClick(cardDiv, card));
    
    return cardDiv;
}

// Create graph card content
function createGraphContent(data) {
    const container = document.createElement('div');
    container.className = 'graph-container';
    
    if (data.graphImage) {
        const img = document.createElement('img');
        img.src = data.graphImage;
        img.alt = 'Datenvisualisierung';
        img.className = 'graph-image';
        container.appendChild(img);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'graph-placeholder';
        placeholder.textContent = 'Graph-Platzhalter';
        container.appendChild(placeholder);
    }
    
    return container;
}

// Create story card content
function createStoryContent(data) {
    const container = document.createElement('div');
    container.className = 'story-content';
    
    const title = document.createElement('div');
    title.className = 'story-title';
    title.textContent = data.storyTitle || 'Story';
    
    const text = document.createElement('div');
    text.className = 'story-text';
    text.textContent = data.storyText || 'Geschichte...';
    
    container.appendChild(title);
    container.appendChild(text);
    
    return container;
}

// Handle card click
function handleCardClick(cardElement, card) {
    if (!gameStarted) return;
    if (cardElement.classList.contains('flipped')) return;
    if (cardElement.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    // Flip the card
    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, card: card });
    
    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
        attempts++;
        updateStats();
        setTimeout(checkForMatch, 1500);
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [first, second] = flippedCards;
    
    // Check if cards form a pair (same pairId but different types)
    if (first.card.pairId === second.card.pairId && 
        first.card.type !== second.card.type) {
        // Match found!
        first.element.classList.add('matched', 'pulse');
        second.element.classList.add('matched', 'pulse');
        matchedPairs++;
        updateStats();
        
        // Check if game is complete
        if (matchedPairs === gameData.length) {
            setTimeout(endGame, 500);
        }
    } else {
        // No match - flip cards back
        first.element.classList.add('shake');
        second.element.classList.add('shake');
        
        setTimeout(() => {
            first.element.classList.remove('flipped', 'shake');
            second.element.classList.remove('flipped', 'shake');
        }, 1200);
    }
    
    flippedCards = [];
}

// Update statistics display
function updateStats() {
    attemptsDisplay.textContent = attempts;
    matchesDisplay.textContent = `${matchedPairs}/${gameData.length}`;
}

// End the game
function endGame() {
    gameStarted = false;
    
    messageTitle.textContent = 'Glückwunsch!';
    messageText.textContent = `Du hast alle Paare in ${attempts} Versuchen gefunden!`;
    gameMessage.classList.remove('hidden');
}

// Show a message dialog
function showMessage(title, text) {
    messageTitle.textContent = title;
    messageText.textContent = text;
    gameMessage.classList.remove('hidden');
}

// Toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Enter fullscreen
        document.documentElement.requestFullscreen().then(() => {
            fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>';
            fullscreenButton.title = 'Vollbild beenden';
            fullscreenButton.setAttribute('aria-label', 'Vollbild beenden');
        }).catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        // Exit fullscreen
        document.exitFullscreen().then(() => {
            fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
            fullscreenButton.title = 'Vollbild';
            fullscreenButton.setAttribute('aria-label', 'Vollbild');
        });
    }
}

// Update fullscreen button icon when fullscreen changes
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
        fullscreenButton.title = 'Vollbild';
        fullscreenButton.setAttribute('aria-label', 'Vollbild');
    }
});

// Utility: Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);
