// Fallbeispiele-Memory Game
// Uses text/image pairs from Fallbeispiele.txt and Fallbeispiele_Daten

// Game Data (from Fallbeispiele.txt)
const gameData = [
	{
		id: 1,
		storyTitle: "Lichtsensor",
		storyText: "Ein Lichtsensor in der Wohnung zeigt, dass jemand regelmäßig um 4 Uhr aufsteht, um zur Arbeit zu gehen.",
		image: "Fallbeispiele_Daten/Licht_4Uhr.png"
	},
	{
		id: 2,
		storyTitle: "Bewegung an Schublade",
		storyText: "Die Bewegungen vom Sensor an der Süßigkeitenschublade legen nahe, wann da jemand genascht hat.",
		image: "Fallbeispiele_Daten/Bewegung_Schublade.jpg"
	},
	{
		id: 3,
		storyTitle: "CO2-Sensor im Schlafzimmer",
		storyText: "Der CO2-Sensor im Schlafzimmer zeigt nicht nur, wann geschlafen wird, sondern auch, ob jemand über Nacht da war.",
		image: "Fallbeispiele_Daten/CO2_2Personen.png"
	},
	{
		id: 4,
		storyTitle: "Bewegung an der Wohnungstür",
		storyText: "Der Bewegungssensor an der Wohnungstür zeigt auch, wann und wie lange mit dem Hund Gassi gegangen wurde.",
		image: "Fallbeispiele_Daten/Bewegung_Wohnungstuer.jpg"
	},
	{
		id: 5,
		storyTitle: "Luftfeuchtigkeit und Temperatur in der Küche",
		storyText: "Am Abend wurde etwas aus dem Tiefkühlfach im Ofen zubereitet.",
		image: "Fallbeispiele_Daten/Temp+Luftf_Kueche.jpg"
	},
	{
		id: 6,
		storyTitle: "Luftqualität durch Deo",
		storyText: "Der Ausschlag in der Luftqualität im Badezimmer zeigt, wann dort Deo benutzt wurde.",
		image: "Fallbeispiele_Daten/Luftquali_Deo.jpg"
	},
	{
		id: 7,
		storyTitle: "Luftfeuchtigkeit im Bad",
		storyText: "Am Abend steigt nach dem Duschen die Luftfeuchtigkeit im Bad stark an, danach wird gelüftet. Etwas später duscht jemand anderes ohne zu lüften.",
		image: "Fallbeispiele_Daten/Luftfeuchtigkeit_Bad.jpg"
	},
	{
		id: 8,
		storyTitle: "Lautstärke und Mittagsruhe",
		storyText: "Im Wohnzimmer ist es mittags ganz ruhig, damit das Kind schlafen kann.",
		image: "Fallbeispiele_Daten/Lautstaerke_Mittagsruhe.jpg"
	}
];

// Game configuration
const GAME_CONFIG = {
	PAIRS_PER_GAME: 6,
	MATCH_CHECK_DELAY: 300,
	MISMATCH_DELAY: 800,
	END_GAME_DELAY: 500
};

// Utility to shuffle array
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Game state
let selectedPairs = [];
let attempts = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

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

function startGame() {
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
	selectedPairs = shuffle([...gameData]).slice(0, GAME_CONFIG.PAIRS_PER_GAME);

	// Render boards
	renderBoards();
}

function renderBoards() {
	// Clear boards
	storyBoard.innerHTML = '';
	dataBoard.innerHTML = '';

	// Shuffle cards
	const storyCards = shuffle(selectedPairs.map(pair => ({
		id: pair.id,
		type: 'story',
		content: `<div class="card-text"><strong>${pair.storyTitle}</strong><br>${pair.storyText}</div>`
	})));
	const imageCards = shuffle(selectedPairs.map(pair => ({
		id: pair.id,
		type: 'image',
		content: `<img src="${pair.image}" alt="${pair.storyTitle}" class="card-image" data-fullsrc="${pair.image}">`
	})));

	// Create story cards
	storyCards.forEach(card => {
		const cardElem = document.createElement('div');
		cardElem.className = 'memory-card';
		cardElem.dataset.id = card.id;
		cardElem.dataset.type = card.type;
		cardElem.innerHTML = card.content;
		cardElem.addEventListener('click', () => handleCardClick(cardElem));
		storyBoard.appendChild(cardElem);
	});

	// Create image cards
	imageCards.forEach(card => {
		const cardElem = document.createElement('div');
		cardElem.className = 'memory-card';
		cardElem.dataset.id = card.id;
		cardElem.dataset.type = card.type;
		cardElem.innerHTML = card.content;
		cardElem.addEventListener('click', () => handleCardClick(cardElem));
		// Add modal logic for image
		const imgElem = cardElem.querySelector('.card-image');
		if (imgElem) {
			imgElem.addEventListener('click', (e) => {
				e.stopPropagation();
				openImageModal(imgElem.getAttribute('data-fullsrc'), imgElem.alt);
			});
		}
		dataBoard.appendChild(cardElem);
	});
}

function handleCardClick(cardElem) {
	if (lockBoard || cardElem.classList.contains('matched') || cardElem === firstCard) return;

	cardElem.classList.add('flipped');

	if (!firstCard) {
		firstCard = cardElem;
		return;
	}
	secondCard = cardElem;
	lockBoard = true;
	attempts++;
	attemptsSpan.textContent = attempts;

	if (firstCard.dataset.id === secondCard.dataset.id && firstCard.dataset.type !== secondCard.dataset.type) {
		// Match found
		setTimeout(() => {
			firstCard.classList.add('matched');
			secondCard.classList.add('matched');
			matches++;
			matchesSpan.textContent = matches;
			resetTurn();
			if (matches === GAME_CONFIG.PAIRS_PER_GAME) {
				setTimeout(showEndMessage, GAME_CONFIG.END_GAME_DELAY);
			}
		}, GAME_CONFIG.MATCH_CHECK_DELAY);
	} else {
		// No match
		setTimeout(() => {
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

newGameButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// Start game on load
window.addEventListener('DOMContentLoaded', startGame);

// Modal logic
const zoomModal = document.getElementById('zoomModal');
const zoomGraphContainer = document.getElementById('zoomGraphContainer');
const zoomClose = document.getElementById('zoomClose');

function openImageModal(src, alt) {
	zoomGraphContainer.innerHTML = `<img src="${src}" alt="${alt}">`;
	zoomModal.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
}

function closeImageModal() {
	zoomModal.classList.add('hidden');
	zoomGraphContainer.innerHTML = '';
	document.body.style.overflow = '';
}

if (zoomClose) zoomClose.addEventListener('click', closeImageModal);
if (zoomModal) zoomModal.addEventListener('click', function(e) {
	if (e.target === zoomModal || e.target.classList.contains('zoom-modal-backdrop')) {
		closeImageModal();
	}
});
