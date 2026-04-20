/* ============================================
   Common JavaScript Utilities
   Simplications Outreach Games
   ============================================ */

/**
 * Common utility functions shared across all games
 */

// ============================================
// DOM Utilities
// ============================================

/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null}
 */
function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Safely query all elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {NodeList}
 */
function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Create an element with optional attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Attributes object
 * @param {Array|string} children - Child elements or text
 * @returns {Element}
 */
function createElement(tag, attrs = {}, children = []) {
    const element = document.createElement(tag);
    
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });
    
    if (typeof children === 'string') {
        element.textContent = children;
    } else if (Array.isArray(children)) {
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Element) {
                element.appendChild(child);
            }
        });
    }
    
    return element;
}

// ============================================
// Array Utilities
// ============================================

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
 * Get random item from array
 * @param {Array} array
 * @returns {*}
 */
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ============================================
// Animation & Timing Utilities
// ============================================

/**
 * Wait for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Request animation frame as a promise
 * @returns {Promise}
 */
function nextFrame() {
    return new Promise(resolve => requestAnimationFrame(resolve));
}

/**
 * Add CSS class with optional delay
 * @param {Element} element
 * @param {string} className
 * @param {number} delay - Delay in ms
 */
async function addClassWithDelay(element, className, delay = 0) {
    if (delay > 0) {
        await wait(delay);
    }
    element.classList.add(className);
}

/**
 * Remove CSS class with optional delay
 * @param {Element} element
 * @param {string} className
 * @param {number} delay - Delay in ms
 */
async function removeClassWithDelay(element, className, delay = 0) {
    if (delay > 0) {
        await wait(delay);
    }
    element.classList.remove(className);
}

// ============================================
// Local Storage Utilities
// ============================================

/**
 * Save data to localStorage with JSON encoding
 * @param {string} key
 * @param {*} data
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.warn('Failed to save to localStorage:', error);
        return false;
    }
}

/**
 * Load data from localStorage with JSON decoding
 * @param {string} key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*}
 */
function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn('Failed to load from localStorage:', error);
        return defaultValue;
    }
}

/**
 * Remove item from localStorage
 * @param {string} key
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn('Failed to remove from localStorage:', error);
        return false;
    }
}

// ============================================
// Event Utilities
// ============================================

/**
 * Debounce a function call
 * @param {Function} func
 * @param {number} delay
 * @returns {Function}
 */
function debounce(func, delay = 250) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle a function call
 * @param {Function} func
 * @param {number} limit
 * @returns {Function}
 */
function throttle(func, limit = 250) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Scroll Utilities
// ============================================

/**
 * Smooth scroll to top
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Smooth scroll to element
 * @param {Element|string} target - Element or selector
 */
function scrollToElement(target) {
    const element = typeof target === 'string' ? $(target) : target;
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// Export for module systems (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        $, $$, createElement,
        shuffleArray, randomItem,
        wait, nextFrame, addClassWithDelay, removeClassWithDelay,
        saveToStorage, loadFromStorage, removeFromStorage,
        debounce, throttle,
        scrollToTop, scrollToElement
    };
}
