// Fallbeispiele-Memory Game
// Uses text/image pairs from Fallbeispiele.txt and Fallbeispiele_Daten

// Game Data (from Fallbeispiele.txt)
const gameData = [
    {
        id: 1,
        storyTitle: "Lichtsensor",
        storyText: "Ein Lichtsensor in der Wohnung zeigt, dass jemand regelmäßig um 4 Uhr aufsteht, um zur Arbeit zu gehen.",
        image: "../data/Fallbeispiele_Daten/Licht_4Uhr.png"
    },
    {
        id: 2,
        storyTitle: "Bewegung an Schublade",
        storyText: "Die Bewegungen vom Sensor an der Süßigkeitenschublade legen nahe, wann da jemand genascht hat.",
        image: "../data/Fallbeispiele_Daten/Bewegung_Schublade.jpg"
    },
    {
        id: 3,
        storyTitle: "CO2-Sensor im Schlafzimmer",
        storyText: "Der CO2-Sensor im Schlafzimmer zeigt nicht nur, wann geschlafen wird, sondern auch, ob jemand über Nacht da war.",
        image: "../data/Fallbeispiele_Daten/CO2_2Personen.png"
    },
    {
        id: 4,
        storyTitle: "Bewegung an der Wohnungstür",
        storyText: "Der Bewegungssensor an der Wohnungstür zeigt auch, wann und wie lange mit dem Hund Gassi gegangen wurde.",
        image: "../data/Fallbeispiele_Daten/Bewegung_Wohnungstuer.jpg"
    },
    {
        id: 5,
        storyTitle: "Luftfeuchtigkeit und Temperatur in der Küche",
        storyText: "Am Abend wurde etwas aus dem Tiefkühlfach im Ofen zubereitet.",
        image: "../data/Fallbeispiele_Daten/Temp+Luftf_Kueche.jpg"
    },
    {
        id: 6,
        storyTitle: "Luftqualität durch Deo",
        storyText: "Der Ausschlag in der Luftqualität im Badezimmer zeigt, wann dort Deo benutzt wurde.",
        image: "../data/Fallbeispiele_Daten/Luftquali_Deo.jpg"
    },
    {
        id: 7,
        storyTitle: "Luftfeuchtigkeit im Bad",
        storyText: "Am Abend steigt nach dem Duschen die Luftfeuchtigkeit im Bad stark an, danach wird gelüftet. Etwas später duscht jemand anderes ohne zu lüften.",
        image: "../data/Fallbeispiele_Daten/Luftfeuchtigkeit_Bad.jpg"
    },
    {
        id: 8,
        storyTitle: "Lautstärke und Mittagsruhe",
        storyText: "Im Wohnzimmer ist es mittags ganz ruhig, damit das Kind schlafen kann.",
        image: "../data/Fallbeispiele_Daten/Lautstaerke_Mittagsruhe.jpg"
    }
];

// Game configuration
const GAME_CONFIG = {
    PAIRS_PER_GAME: 6,
    MATCH_CHECK_DELAY: 300,
    MISMATCH_DELAY: 800,
    END_GAME_DELAY: 500
};

// Game state
let selectedPairs = [];
let attempts = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pendingTimeouts = []; // Timers of the current game, cleared on restart
let zoomTrigger = null; // Element to return focus to when the modal closes

// DOM elements
const storyBoard = document.getElementById('storyBoard');
const dataBoard = document.getElementById('dataBoard');
const attemptsSpan = document.getElementById('attempts');
const matchesSpan = document.getElementById('matches');
const newGameButton = document.getElementById('newGameButton');
const gameMessage = document.getElementById('gameMessage');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const restartButton = document.getElementById('restartButton');
const srAnnouncements = document.getElementById('srAnnouncements');
const zoomModal = document.getElementById('zoomModal');
const zoomGraphContainer = document.getElementById('zoomGraphContainer');
const zoomClose = document.getElementById('zoomClose');

// Announce message to screen readers
function announceToScreenReader(message) {
    if (!srAnnouncements) return;
    srAnnouncements.textContent = message;
    setTimeout(() => { srAnnouncements.textContent = ''; }, 1000);
}

// Schedule a timer that is cancelled when a new game starts
function scheduleTimeout(fn, delay) {
    const id = setTimeout(() => {
        pendingTimeouts = pendingTimeouts.filter(t => t !== id);
        fn();
    }, delay);
    pendingTimeouts.push(id);
}

function startGame() {
    pendingTimeouts.forEach(clearTimeout);
    pendingTimeouts = [];

    // Reset state
    attempts = 0;
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    attemptsSpan.textContent = attempts;
    matchesSpan.textContent = matches;
    gameMessage.classList.add('hidden');

    // Select random pairs
    selectedPairs = shuffleArray(gameData).slice(0, GAME_CONFIG.PAIRS_PER_GAME);

    renderBoards();
}

// Create a card element with button semantics
function createCardElement(id, type, label) {
    const cardElem = document.createElement('div');
    cardElem.className = 'memory-card';
    cardElem.dataset.id = id;
    cardElem.dataset.type = type;
    cardElem.tabIndex = 0;
    cardElem.setAttribute('role', 'button');
    cardElem.setAttribute('aria-label', label);
    cardElem.addEventListener('click', () => handleCardClick(cardElem));
    cardElem.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === cardElem) {
            e.preventDefault();
            handleCardClick(cardElem);
        }
    });
    return cardElem;
}

function renderBoards() {
    storyBoard.innerHTML = '';
    dataBoard.innerHTML = '';

    // Story cards (text is set via textContent, never as HTML)
    shuffleArray(selectedPairs).forEach(pair => {
        const cardElem = createCardElement(pair.id, 'story', `Textbeispiel: ${pair.storyTitle}`);

        const text = document.createElement('div');
        text.className = 'card-text';
        const title = document.createElement('strong');
        title.textContent = pair.storyTitle;
        text.append(title, document.createElement('br'), pair.storyText);

        cardElem.appendChild(text);
        storyBoard.appendChild(cardElem);
    });

    // Image cards (alt text is neutral so it does not reveal the matching story)
    shuffleArray(selectedPairs).forEach((pair, index) => {
        const imageLabel = `Sensordaten-Bild ${index + 1}`;
        const cardElem = createCardElement(pair.id, 'image', imageLabel);

        const img = document.createElement('img');
        img.src = pair.image;
        img.alt = imageLabel;
        img.className = 'card-image';
        cardElem.appendChild(img);

        const zoomIcon = document.createElement('button');
        zoomIcon.type = 'button';
        zoomIcon.className = 'zoom-icon';
        zoomIcon.textContent = '🔍';
        zoomIcon.setAttribute('aria-label', `${imageLabel} vergrößern`);
        zoomIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openImageModal(pair.image, imageLabel);
        });
        cardElem.appendChild(zoomIcon);

        dataBoard.appendChild(cardElem);
    });
}

function handleCardClick(cardElem) {
    if (lockBoard || cardElem.classList.contains('matched') || cardElem === firstCard) return;

    // A second pick must come from the opposite board
    if (firstCard && firstCard.dataset.type === cardElem.dataset.type) return;

    cardElem.classList.add('flipped');

    if (!firstCard) {
        firstCard = cardElem;
        return;
    }
    secondCard = cardElem;
    lockBoard = true;
    attempts++;
    attemptsSpan.textContent = attempts;

    if (firstCard.dataset.id === secondCard.dataset.id) {
        // Match found (types always differ because of the guard above)
        scheduleTimeout(() => {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matches++;
            matchesSpan.textContent = matches;
            announceToScreenReader(`Übereinstimmung gefunden. ${matches} von ${selectedPairs.length} Paaren gefunden.`);
            resetTurn();
            if (matches === selectedPairs.length) {
                scheduleTimeout(showEndMessage, GAME_CONFIG.END_GAME_DELAY);
            }
        }, GAME_CONFIG.MATCH_CHECK_DELAY);
    } else {
        // No match
        announceToScreenReader('Keine Übereinstimmung. Versuche es erneut.');
        scheduleTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
        }, GAME_CONFIG.MISMATCH_DELAY);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function showEndMessage() {
    messageTitle.textContent = 'Glückwunsch!';
    messageText.textContent = `Du hast alle Paare gefunden in ${attempts} Versuchen.`;
    gameMessage.classList.remove('hidden');
}

// Modal logic
function openImageModal(src, alt) {
    zoomTrigger = document.activeElement;
    zoomGraphContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    zoomGraphContainer.appendChild(img);
    zoomModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    zoomClose.focus();
}

function closeImageModal() {
    zoomModal.classList.add('hidden');
    zoomGraphContainer.innerHTML = '';
    document.body.style.overflow = '';
    if (zoomTrigger && typeof zoomTrigger.focus === 'function') zoomTrigger.focus();
    zoomTrigger = null;
}

newGameButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
zoomClose.addEventListener('click', closeImageModal);
zoomModal.addEventListener('click', (e) => {
    if (e.target === zoomModal || e.target.classList.contains('zoom-modal-backdrop')) {
        closeImageModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (zoomModal.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
        closeImageModal();
    } else if (e.key === 'Tab') {
        // The close button is the only focusable element in the modal
        e.preventDefault();
        zoomClose.focus();
    }
});

// Start game on load
document.addEventListener('DOMContentLoaded', startGame);
