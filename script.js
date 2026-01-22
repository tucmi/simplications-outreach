// Game Data - Add your stories and graphs here
const gameData = [
    {
        id: 1,
        storyTitle: "Temperaturanstieg",
        storyText: "Die Temperatur in einem Raum steigt kontinuierlich über den Tag an, bis die Klimaanlage eingeschaltet wird.",
        graphImage: ""
    },
    {
        id: 2,
        storyTitle: "Bewegungsmuster",
        storyText: "Ein regelmäßiges Bewegungsmuster zeigt, dass jemand jeden Morgen um 7 Uhr aufsteht und das Haus verlässt.",
        graphImage: ""
    },
    {
        id: 3,
        storyTitle: "Stromverbrauch",
        storyText: "Der Stromverbrauch zeigt deutliche Spitzen am Morgen und Abend, wenn die meisten Geräte in Betrieb sind.",
        graphImage: ""
    },
    {
        id: 4,
        storyTitle: "Luftfeuchtigkeit",
        storyText: "Nach dem Duschen steigt die Luftfeuchtigkeit im Badezimmer schnell an und normalisiert sich dann wieder.",
        graphImage: ""
    },
    {
        id: 5,
        storyTitle: "Lichtintensität",
        storyText: "Die Lichtintensität folgt dem natürlichen Tagesrhythmus mit einem Maximum zur Mittagszeit.",
        graphImage: ""
    },
    {
        id: 6,
        storyTitle: "Wasserverbrauch",
        storyText: "Hoher Wasserverbrauch am Morgen und Abend deutet auf Körperpflege und Kochen hin.",
        graphImage: ""
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
        setTimeout(checkForMatch, 800);
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
        }, 600);
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
