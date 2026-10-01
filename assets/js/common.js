/* ============================================
   Common JavaScript Utilities
   Simplications Transfer Games
   ============================================ */

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array (new array, doesn't mutate original)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Smooth scroll to top
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
