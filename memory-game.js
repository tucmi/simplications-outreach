// Game Data - Add your stories and graphs here
const gameData = [
    {
        id: 1,
        storyTitle: "Temperaturanstieg",
        storyText: "Die Temperatur in einem Raum steigt kontinuierlich über den Tag an, bis die Klimaanlage eingeschaltet wird.",
        graphType: "line",
        graphTitle: "Temperatur im Tagesverlauf",
        graphData: [18, 18.5, 19, 20, 21.5, 23, 25, 27, 21, 20, 20],
        yAxisLabel: "°C",
        timeLabels: ["6h", "8h", "10h", "12h", "14h", "16h", "18h", "20h", "21h", "22h", "23h"]
    },
    {
        id: 2,
        storyTitle: "Bewegungsmuster",
        storyText: "Ein regelmäßiges Bewegungsmuster zeigt, dass jemand morgens um 7 Uhr aufsteht und abends um 18 Uhr nach Hause kommt.",
        graphType: "bar",
        graphTitle: "Bewegungsaktivität",
        graphData: [2, 5, 95, 85, 5, 3, 2, 8, 90, 75, 40, 5],
        yAxisLabel: "",
        highlightIndices: [2, 8],
        timeLabels: ["0h", "5h", "7h", "8h", "10h", "12h", "14h", "16h", "18h", "19h", "21h", "23h"]
    },
    {
        id: 3,
        storyTitle: "Stromverbrauch",
        storyText: "Der Stromverbrauch zeigt drei deutliche Spitzen: morgens, mittags beim Kochen und abends, wenn die meisten Geräte in Betrieb sind.",
        graphType: "area",
        graphTitle: "Stromverbrauch (24h)",
        graphData: [3, 5, 85, 75, 45, 65, 70, 50, 35, 30, 45, 88, 70, 40, 8],
        yAxisLabel: "kWh",
        timeLabels: ["0h", "4h", "7h", "8h", "10h", "12h", "13h", "14h", "15h", "16h", "18h", "20h", "21h", "22h", "23h"]
    },
    {
        id: 4,
        storyTitle: "Luftfeuchtigkeit",
        storyText: "Nach dem Duschen steigt die Luftfeuchtigkeit im Badezimmer schnell an und normalisiert sich dann wieder.",
        graphType: "line",
        graphTitle: "Luftfeuchtigkeit",
        graphData: [52, 52, 53, 98, 95, 88, 78, 68, 62, 58, 55, 53],
        yAxisLabel: "%",
        timeLabels: ["6h", "6.5h", "7h", "7.2h", "7.3h", "7.5h", "8h", "8.5h", "9h", "10h", "11h", "12h"]
    },
    {
        id: 5,
        storyTitle: "Lichtintensität",
        storyText: "Die Lichtintensität folgt dem natürlichen Tagesrhythmus mit einem Maximum am Nachmittag gegen 14 Uhr.",
        graphType: "smooth",
        graphTitle: "Lichtintensität",
        graphData: [0, 0, 5, 25, 55, 85, 100, 85, 55, 25, 5, 0, 0],
        yAxisLabel: "Lux",
        timeLabels: ["0h", "3h", "6h", "8h", "10h", "12h", "14h", "16h", "18h", "20h", "22h", "23h", "24h"]
    },
    {
        id: 6,
        storyTitle: "Wasserverbrauch",
        storyText: "Der Wasserverbrauch zeigt mehrere Spitzen über den Tag verteilt: morgens beim Duschen, mittags, und abends beim Kochen.",
        graphType: "bar",
        graphTitle: "Wasserverbrauch",
        graphData: [1, 3, 75, 45, 25, 15, 35, 20, 12, 8, 65, 40, 28, 18, 8, 2],
        yAxisLabel: "L",
        highlightIndices: [2, 10],
        timeLabels: ["0h", "5h", "7h", "8h", "9h", "10h", "12h", "13h", "14h", "16h", "19h", "20h", "21h", "22h", "23h", "24h"]
    },
    {
        id: 7,
        storyTitle: "CO2-Konzentration",
        storyText: "Die CO2-Konzentration steigt langsam an, wenn sich jemand im geschlossenen Raum aufhält, und fällt rapide ab, sobald das Fenster geöffnet wird.",
        graphType: "area",
        graphTitle: "CO2-Konzentration",
        graphData: [400, 450, 520, 600, 720, 850, 980, 1100, 1180, 550, 420, 410, 400],
        yAxisLabel: "ppm",
        timeLabels: ["8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "16.5h", "17h", "18h", "19h"]
    },
    {
        id: 8,
        storyTitle: "Türaktivität",
        storyText: "Jede Türöffnung wird registriert und zeigt an, wann jemand das Haus betritt oder verlässt.",
        graphType: "bar",
        graphTitle: "Türöffnungen",
        graphData: [0, 0, 8, 6, 0, 1, 0, 2, 9, 7, 1, 0, 0, 3, 0, 0],
        yAxisLabel: "",
        highlightIndices: [2, 8],
        timeLabels: ["0h", "3h", "7h", "8h", "10h", "12h", "14h", "16h", "18h", "19h", "20h", "21h", "22h", "23h", "23.5h", "24h"]
    }
];

// Constants
const SVG_CONFIG = {
    WIDTH: 400,
    HEIGHT: 300,
    PADDING: { top: 40, right: 30, bottom: 50, left: 50 },
    COLORS: {
        BACKGROUND: '#F7F7F8',
        PRIMARY: '#BF4254',
        SECONDARY: '#84888E'
    },
    FONT_SIZES: {
        TITLE: 14,
        LABEL: 11,
        TIME: 9
    }
};

const GAME_CONFIG = {
    SCENARIOS_PER_GAME: 6,
    MATCH_CHECK_DELAY: 300,
    MISMATCH_DELAY: 800,
    MISMATCH_FLIP_DELAY: 400,
    END_GAME_DELAY: 500,
    PULSE_DELAY: 100
};

// Helper function to sanitize text for SVG
function sanitizeForSVG(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Generate SVG graph from data
 * @param {Object} data - Graph data object containing graphType, graphData, labels, etc.
 * @param {boolean} showTitle - Whether to display the graph title
 * @returns {string} Data URI containing the SVG
 */
function generateGraph(data, showTitle = true) {
    try {
        // Validate input
        if (!data || !data.graphType || !Array.isArray(data.graphData) || data.graphData.length === 0) {
            console.error('Invalid graph data:', data);
            return createErrorSVG();
        }
        
        const { graphType, graphTitle, graphData, yAxisLabel, highlightIndices, timeLabels } = data;
        
        const { WIDTH: width, HEIGHT: height, PADDING: padding, COLORS, FONT_SIZES } = SVG_CONFIG;
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;
        
        const maxValue = Math.max(...graphData);
        const minValue = Math.min(...graphData);
        const valueRange = maxValue - minValue || 1;
        
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`;
        svg += `<rect width="${width}" height="${height}" fill="${COLORS.BACKGROUND}"/>`;
        
        // Only show title if showTitle is true
        if (showTitle && graphTitle) {
            svg += `<text x="${width/2}" y="25" text-anchor="middle" font-size="${FONT_SIZES.TITLE}" font-weight="bold" fill="${COLORS.PRIMARY}">${sanitizeForSVG(graphTitle)}</text>`;
        }
        
        // Axes
        const axisY = padding.top + chartHeight;
        svg += `<line x1="${padding.left}" y1="${axisY}" x2="${width - padding.right}" y2="${axisY}" stroke="${COLORS.SECONDARY}" stroke-width="1"/>`;
        svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${axisY}" stroke="${COLORS.SECONDARY}" stroke-width="1"/>`;
        
        // Y-axis label
        if (yAxisLabel) {
            svg += `<text x="${padding.left - 30}" y="${height/2}" font-size="${FONT_SIZES.LABEL}" fill="${COLORS.SECONDARY}">${sanitizeForSVG(yAxisLabel)}</text>`;
        }
    
    // X-axis time labels
    if (timeLabels && timeLabels.length > 0) {
        const stepX = chartWidth / (graphData.length - 1);
        timeLabels.forEach((label, i) => {
            const x = padding.left + (i * stepX);
            const y = axisY + 20;
                svg += `<text x="${x}" y="${y}" font-size="${FONT_SIZES.TIME}" fill="${COLORS.SECONDARY}" text-anchor="middle">${sanitizeForSVG(label)}</text>`;
            });
        }
        
        // X-axis label
        svg += `<text x="${width/2}" y="${height - 10}" font-size="${FONT_SIZES.LABEL}" fill="${COLORS.SECONDARY}" text-anchor="middle">Zeit</text>`;
        
        // Generate graph based on type
        switch(graphType) {
            case 'line':
                svg += generateLineGraph(graphData, padding, chartWidth, chartHeight, maxValue, minValue, valueRange);
                break;
            case 'bar':
                svg += generateBarGraph(graphData, padding, chartWidth, chartHeight, maxValue, highlightIndices);
                break;
            case 'area':
                svg += generateAreaGraph(graphData, padding, chartWidth, chartHeight, maxValue, minValue, valueRange);
                break;
            case 'smooth':
                svg += generateSmoothGraph(graphData, padding, chartWidth, chartHeight, maxValue, minValue, valueRange);
                break;
            default:
                console.warn('Unknown graph type:', graphType);
                return createErrorSVG();
        }
        
        svg += '</svg>';
        return 'data:image/svg+xml,' + encodeURIComponent(svg);
    } catch (error) {
        console.error('Error generating graph:', error);
        return createErrorSVG();
    }
}

/**
 * Create a fallback error SVG
 * @returns {string} Data URI containing error SVG
 */
function createErrorSVG() {
    const { WIDTH: width, HEIGHT: height } = SVG_CONFIG;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="#F7F7F8"/>
        <text x="${width/2}" y="${height/2}" text-anchor="middle" font-size="12" fill="#BF4254">Fehler beim Laden</text>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function generateLineGraph(data, padding, chartWidth, chartHeight, maxValue, minValue, valueRange) {
    const stepX = chartWidth / (data.length - 1);
    let path = 'M ';
    
    data.forEach((value, i) => {
        const x = padding.left + (i * stepX);
        const normalized = (value - minValue) / valueRange;
        const y = padding.top + chartHeight - (normalized * chartHeight);
        path += `${x} ${y} `;
        if (i < data.length - 1) path += 'L ';
    });
    
    return `<path d="${path}" stroke="#BF4254" stroke-width="2.5" fill="none"/>`;
}

function generateBarGraph(data, padding, chartWidth, chartHeight, maxValue, highlightIndices = []) {
    const barWidth = chartWidth / data.length * 0.7;
    const stepX = chartWidth / data.length;
    let svg = '';
    
    data.forEach((value, i) => {
        const x = padding.left + (i * stepX) + (stepX - barWidth) / 2;
        const barHeight = (value / maxValue) * chartHeight;
        const y = padding.top + chartHeight - barHeight;
        const isHighlighted = highlightIndices.includes(i);
        const color = isHighlighted ? '#BF4254' : '#84888E';
        svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${color}" rx="1"/>`;
    });
    
    return svg;
}

function generateAreaGraph(data, padding, chartWidth, chartHeight, maxValue, minValue, valueRange) {
    const stepX = chartWidth / (data.length - 1);
    let path = 'M ';
    
    data.forEach((value, i) => {
        const x = padding.left + (i * stepX);
        const normalized = (value - minValue) / valueRange;
        const y = padding.top + chartHeight - (normalized * chartHeight);
        path += `${x} ${y} `;
        if (i < data.length - 1) path += 'L ';
    });
    
    const linePath = path;
    const areaPath = path + `L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;
    
    return `<path d="${areaPath}" fill="#BF4254" opacity="0.2"/><path d="${linePath}" stroke="#BF4254" stroke-width="2.5" fill="none"/>`;
}

function generateSmoothGraph(data, padding, chartWidth, chartHeight, maxValue, minValue, valueRange) {
    const stepX = chartWidth / (data.length - 1);
    const points = data.map((value, i) => {
        const x = padding.left + (i * stepX);
        const normalized = (value - minValue) / valueRange;
        const y = padding.top + chartHeight - (normalized * chartHeight);
        return { x, y };
    });
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
        const xMid = (points[i].x + points[i + 1].x) / 2;
        const yMid = (points[i].y + points[i + 1].y) / 2;
        path += ` Q ${points[i].x} ${points[i].y}, ${xMid} ${yMid}`;
        if (i === points.length - 2) {
            path += ` Q ${points[i + 1].x} ${points[i + 1].y}, ${points[i + 1].x} ${points[i + 1].y}`;
        }
    }
    
    const linePath = path;
    const areaPath = path + ` L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;
    
    return `<path d="${areaPath}" fill="#BF4254" opacity="0.15"/><path d="${linePath}" stroke="#BF4254" stroke-width="2.5" fill="none"/>`;
}

// Game State
let cards = [];
let cardDataMap = new Map(); // Store card data by index to avoid memory leaks
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let gameStarted = false;
let lastSelectedType = null; // Track which type was selected last
let currentPairCount = 0; // Track actual number of pairs in current game
let isProcessingMatch = false; // Prevent interaction during match checking

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
const zoomModal = document.getElementById('zoomModal');
const zoomClose = document.getElementById('zoomClose');
const zoomGraphContainer = document.getElementById('zoomGraphContainer');
const srAnnouncements = document.getElementById('srAnnouncements');

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    if (srAnnouncements) {
        srAnnouncements.textContent = message;
        // Clear after announcement to allow repeated messages
        setTimeout(() => {
            srAnnouncements.textContent = '';
        }, 1000);
    }
}

// Zoom Modal Functions
function showZoomModal(data) {
    zoomGraphContainer.innerHTML = '';
    
    const img = document.createElement('img');
    img.src = generateGraph(data, false); // Keep title hidden in zoomed view
    img.alt = data.graphTitle || 'Datenvisualisierung';
    zoomGraphContainer.appendChild(img);
    
    zoomModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideZoomModal() {
    zoomModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Initialize the game
function init() {
    newGameButton.addEventListener('click', startNewGame);
    fullscreenButton.addEventListener('click', toggleFullscreen);
    restartButton.addEventListener('click', startNewGame);
    
    // Zoom modal event listeners
    zoomClose.addEventListener('click', hideZoomModal);
    zoomModal.querySelector('.zoom-modal-backdrop').addEventListener('click', hideZoomModal);
    
    // Event delegation for card clicks
    storyBoard.addEventListener('click', handleBoardClick);
    dataBoard.addEventListener('click', handleBoardClick);
    
    // ESC key to close zoom modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !zoomModal.classList.contains('hidden')) {
            hideZoomModal();
        }
    });
    
    // Auto-start the game
    startNewGame();
}

// Handle clicks on game boards (event delegation)
function handleBoardClick(e) {
    const cardElement = e.target.closest('.card');
    if (!cardElement) return;
    
    const cardIndex = cardElement.dataset.index;
    const cardData = cardDataMap.get(cardIndex);
    if (!cardData) return;
    
    handleCardClick(cardElement, cardData);
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
    lastSelectedType = null;
    cardDataMap.clear(); // Clear previous card data
    
    resetBoardHighlighting();
    updateStats();
    createCards();
}

/**
 * Create and shuffle cards for the game
 */
function createCards() {
    storyBoard.innerHTML = '';
    dataBoard.innerHTML = '';
    cards = [];
    
    // Validate game data
    if (!gameData || !Array.isArray(gameData) || gameData.length < GAME_CONFIG.SCENARIOS_PER_GAME) {
        console.error('Insufficient game data');
        showMessage('Fehler', 'Nicht genügend Szenarien verfügbar.');
        return;
    }
    
    // Randomly select scenarios from all available scenarios
    const selectedScenarios = shuffleArray([...gameData]).slice(0, GAME_CONFIG.SCENARIOS_PER_GAME);
    currentPairCount = selectedScenarios.length;
    
    const storyCards = [];
    const graphCards = [];
    
    // Create pairs of cards (graph + story)
    selectedScenarios.forEach((item, index) => {
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
    
    // Store card data in map for event delegation
    cardDataMap.set(String(index), card);
    
    // Data cards start flipped (always visible)
    if (card.type === 'graph') {
        cardDiv.classList.add('flipped', 'data-always-visible');
    }
    
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
    
    // No event listener needed - using event delegation
    
    return cardDiv;
}

// Create graph card content
function createGraphContent(data) {
    const container = document.createElement('div');
    container.className = 'graph-container';
    
    const img = document.createElement('img');
    img.src = generateGraph(data, false); // Don't show title initially
    img.alt = 'Datenvisualisierung';
    img.className = 'graph-image';
    container.appendChild(img);
    
    // Add zoom icon
    const zoomIcon = document.createElement('button');
    zoomIcon.className = 'zoom-icon';
    zoomIcon.innerHTML = '🔍';
    zoomIcon.setAttribute('aria-label', 'Vergrößern');
    zoomIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        showZoomModal(data);
    });
    container.appendChild(zoomIcon);
    
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

/**
 * Handle card click event
 * @param {HTMLElement} cardElement - The clicked card element
 * @param {Object} card - Card data object
 */
function handleCardClick(cardElement, card) {
    if (!gameStarted) return;
    if (isProcessingMatch) return; // Prevent interaction during match checking
    if (cardElement.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    // For story cards, check if already flipped
    if (card.type === 'story' && cardElement.classList.contains('flipped')) return;
    
    // For data cards, they're always visible - just add to selection
    // For story cards, flip them
    if (card.type === 'story') {
        cardElement.classList.add('flipped');
    }
    
    flippedCards.push({ element: cardElement, card: card });
    
    // Update board highlighting
    if (flippedCards.length === 1) {
        // First card selected - highlight the opposite board
        lastSelectedType = card.type;
        if (card.type === 'story') {
            storyBoard.parentElement.classList.remove('active');
            dataBoard.parentElement.classList.add('active');
            storyBoard.parentElement.classList.add('inactive');
        } else {
            dataBoard.parentElement.classList.remove('active');
            storyBoard.parentElement.classList.add('active');
            dataBoard.parentElement.classList.add('inactive');
        }
    } else if (flippedCards.length === 2) {
        // Both cards selected - remove all highlighting
        resetBoardHighlighting();
    }
    
    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
        attempts++;
        updateStats();
        setTimeout(checkForMatch, GAME_CONFIG.MATCH_CHECK_DELAY);
    }
}

// Reset board highlighting
function resetBoardHighlighting() {
    storyBoard.parentElement.classList.remove('active', 'inactive');
    dataBoard.parentElement.classList.remove('active', 'inactive');
    lastSelectedType = null;
}

/**
 * Check if two flipped cards match
 */
function checkForMatch() {
    isProcessingMatch = true;
    const [first, second] = flippedCards;
    
    // Check if cards form a pair (same pairId but different types)
    if (first.card.pairId === second.card.pairId && 
        first.card.type !== second.card.type) {
        // Match found!
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        
        // Show title on the graph card
        const graphCard = first.card.type === 'graph' ? first : second;
        const graphImg = graphCard.element.querySelector('.graph-image');
        if (graphImg) {
            graphImg.src = generateGraph(graphCard.card.data, true); // Regenerate with title
        }
        
        // Add pulse animation briefly
        setTimeout(() => {
            first.element.classList.add('pulse');
            second.element.classList.add('pulse');
        }, GAME_CONFIG.PULSE_DELAY);
        
        matchedPairs++;
        updateStats();
        flippedCards = [];
        resetBoardHighlighting();
        isProcessingMatch = false;
        
        // Announce match to screen readers
        const matchTitle = graphCard.card.data.storyTitle || 'Paar';
        announceToScreenReader(`Übereinstimmung gefunden: ${matchTitle}. ${matchedPairs} von ${currentPairCount} Paaren gefunden.`);
        
        // Check if game is complete
        if (matchedPairs === currentPairCount) {
            setTimeout(endGame, GAME_CONFIG.END_GAME_DELAY);
        }
    } else {
        // No match - keep cards flipped, show shake, then flip back
        announceToScreenReader('Keine Übereinstimmung. Versuche es erneut.');
        setTimeout(() => {
            first.element.classList.add('shake');
            second.element.classList.add('shake');
            
            // After shake animation completes, flip cards back
            setTimeout(() => {
                first.element.classList.remove('shake', 'flipped');
                second.element.classList.remove('shake', 'flipped');
                flippedCards = [];
                resetBoardHighlighting();
                isProcessingMatch = false;
            }, GAME_CONFIG.MISMATCH_FLIP_DELAY);
        }, GAME_CONFIG.MISMATCH_DELAY);
    }
}

// Update statistics display
function updateStats() {
    attemptsDisplay.textContent = attempts;
    matchesDisplay.textContent = `${matchedPairs}/${currentPairCount}`;
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

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);
