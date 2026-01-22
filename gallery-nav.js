/* ============================================
   Gallery Navigation System
   ============================================ */

/**
 * Games Configuration
 * Add new games here to include them in the gallery navigation
 */
const GAMES = [
    {
        id: 'memory',
        title: 'Daten-Memory',
        file: 'memory-game.html',
        description: 'Ordne Datenvisualisierungen ihren Geschichten zu'
    },
    {
        id: 'sensorium',
        title: 'Sensorium',
        file: 'sensorium-game.html',
        description: 'Entdecke die zwei Perspektiven der Datensammlung'
    }
    // Add future games here:
    // {
    //     id: 'game-id',
    //     title: 'Game Title',
    //     file: 'game-name.html',
    //     description: 'Game description'
    // }
];

/**
 * Get current game index based on current page
 */
function getCurrentGameIndex() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return GAMES.findIndex(game => game.file === currentPage);
}

/**
 * Initialize gallery navigation
 */
function initGalleryNav() {
    const currentIndex = getCurrentGameIndex();
    
    if (currentIndex === -1) {
        console.warn('Current page not found in games list');
        return;
    }
    
    createNavigationArrows(currentIndex);
    createGameIndicator(currentIndex);
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Create left and right navigation arrows
 */
function createNavigationArrows(currentIndex) {
    const navContainer = document.createElement('div');
    navContainer.className = 'gallery-nav';
    
    // Left arrow (previous game)
    if (currentIndex > 0) {
        const prevGame = GAMES[currentIndex - 1];
        const leftArrow = document.createElement('button');
        leftArrow.className = 'gallery-nav-arrow left';
        leftArrow.innerHTML = '←';
        leftArrow.setAttribute('data-game-title', prevGame.title);
        leftArrow.setAttribute('aria-label', `Zurück zu ${prevGame.title}`);
        leftArrow.addEventListener('click', () => navigateToGame(currentIndex - 1));
        navContainer.appendChild(leftArrow);
    }
    
    // Right arrow (next game)
    if (currentIndex < GAMES.length - 1) {
        const nextGame = GAMES[currentIndex + 1];
        const rightArrow = document.createElement('button');
        rightArrow.className = 'gallery-nav-arrow right';
        rightArrow.innerHTML = '→';
        rightArrow.setAttribute('data-game-title', nextGame.title);
        rightArrow.setAttribute('aria-label', `Weiter zu ${nextGame.title}`);
        rightArrow.addEventListener('click', () => navigateToGame(currentIndex + 1));
        navContainer.appendChild(rightArrow);
    }
    
    document.body.appendChild(navContainer);
}

/**
 * Create game indicator dots at bottom
 */
function createGameIndicator(currentIndex) {
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'gallery-indicator';
    indicatorContainer.setAttribute('aria-label', 'Spiel-Navigation');
    
    GAMES.forEach((game, index) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-indicator-dot' + (index === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', game.title);
        dot.setAttribute('title', game.title);
        
        if (index !== currentIndex) {
            dot.style.cursor = 'pointer';
            dot.addEventListener('click', () => navigateToGame(index));
        }
        
        indicatorContainer.appendChild(dot);
    });
    
    document.body.appendChild(indicatorContainer);
}

/**
 * Navigate to a specific game
 */
function navigateToGame(index) {
    if (index < 0 || index >= GAMES.length) {
        return;
    }
    
    const targetGame = GAMES[index];
    
    // Add smooth transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = targetGame.file;
    }, 300);
}

/**
 * Handle keyboard navigation
 * Arrow keys: Left/Right to navigate between games
 * Numbers: 1-9 to jump to specific game
 */
function handleKeyboardNavigation(event) {
    const currentIndex = getCurrentGameIndex();
    
    // Ignore if user is typing in an input field
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(event.key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                event.preventDefault();
                navigateToGame(currentIndex - 1);
            }
            break;
            
        case 'ArrowRight':
            if (currentIndex < GAMES.length - 1) {
                event.preventDefault();
                navigateToGame(currentIndex + 1);
            }
            break;
            
        // Number keys for direct navigation
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            const targetIndex = parseInt(event.key) - 1;
            if (targetIndex < GAMES.length && targetIndex !== currentIndex) {
                event.preventDefault();
                navigateToGame(targetIndex);
            }
            break;
    }
}

/**
 * Get all games (useful for external access)
 */
function getAllGames() {
    return [...GAMES];
}

/**
 * Get current game info
 */
function getCurrentGame() {
    const index = getCurrentGameIndex();
    return index >= 0 ? GAMES[index] : null;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryNav);
} else {
    initGalleryNav();
}

// Export functions for external use
window.GalleryNav = {
    getAllGames,
    getCurrentGame,
    navigateToGame,
    GAMES
};
