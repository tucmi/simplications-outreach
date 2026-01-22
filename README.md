# Simplications Outreach Games

Interactive educational games about data privacy and IoT devices for the Simplications project.

## 📁 File Structure

### Game Files

Each game follows a consistent naming convention: `{game-name}-game.{ext}`

#### Memory Game (Daten-Memory)

- `memory-game.html` - Memory matching game HTML
- `memory-game.css` - Memory game-specific styles
- `memory-game.js` - Memory game logic and data

#### Sensorium Game (Was siehst DU?)

- `sensorium-game.html` - Sensorium perspective game HTML
- `sensorium-game.css` - Sensorium game-specific styles
- `sensorium-game.js` - Sensorium game logic and scenarios

### Shared Files

- `common.css` - Shared styles (colors, typography, buttons, animations)
- `common.js` - Shared utility functions (DOM helpers, array utils, storage, animations)
- `gallery-nav.css` - Gallery carousel navigation styles
- `gallery-nav.js` - Gallery carousel navigation logic

### Other Files

- `index.html` - Redirect to memory-game.html for backward compatibility
- `README.md` - This file
- `LICENSE` - Project license

## 🎮 Games

### 1. Daten-Memory (Memory Game)

Match data visualizations with the stories they tell. Players must connect graphs with their corresponding narratives to understand data interpretation.

**File:** `memory-game.html`

**Features:**

- 6 matching pairs (graphs + stories)
- Dynamic SVG graph generation
- Flip animations
- Statistics tracking
- Fullscreen mode

### 2. Sensorium (Perspective Game)

Discover the two perspectives of data collection - what you think you're sharing vs. what's actually being collected.

**File:** `sensorium-game.html`

**Features:**

- 3 IoT device scenarios (Smart Speaker, Smoke Detector, Smart TV)
- Dual perspective switching
- Data comparison reveals
- Educational insights
- Progressive scenario navigation

## 🚀 Getting Started

### Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tucmi/simplications-outreach.git
   cd simplications-outreach
   ```

2. **Start a local server:**

   ```bash
   # Python 3
   python -m http.server 8000
   
   # PHP
   php -S localhost:8000
   
   # Node.js (with http-server)
   npx http-server -p 8000
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:8000`
   - Or directly open `memory-game.html` or `sensorium-game.html`

### Gallery Navigation

Use the arrow keys or click the side arrows to navigate between games:

- **← / →** - Switch between games
- **1, 2** - Jump to specific game
- Click dots at bottom to jump to any game

## 🛠️ Adding a New Game

1. **Create game files following the naming convention:**

   ```
   new-game-name.html
   new-game-name.css
   new-game-name.js
   ```

2. **Include shared files in your HTML:**

   ```html
   <link rel="stylesheet" href="common.css">
   <link rel="stylesheet" href="new-game-name.css">
   <link rel="stylesheet" href="gallery-nav.css">
   
   <script src="common.js"></script>
   <script src="new-game-name.js"></script>
   <script src="gallery-nav.js"></script>
   ```

3. **Register in gallery navigation:**
   Edit `gallery-nav.js` and add your game to the `GAMES` array:

   ```javascript
   {
       id: 'new-game',
       title: 'New Game Title',
       file: 'new-game-name.html',
       description: 'Game description'
   }
   ```

## 📦 Common Resources

### common.css

Provides:

- CSS variables (colors, shadows, transitions)
- Base reset and typography
- Header/footer styles
- Button styles (`.btn-primary`, `.btn-secondary`)
- Common animations (`fadeIn`, `fadeInUp`, `pulse`, `bounce`)
- Utility classes (`.fade-in`, `.text-center`, `.hidden`)

### common.js

Provides utility functions:

- **DOM:** `$()`, `$$()`, `createElement()`
- **Arrays:** `shuffleArray()`, `randomItem()`
- **Timing:** `wait()`, `nextFrame()`, `addClassWithDelay()`
- **Storage:** `saveToStorage()`, `loadFromStorage()`, `removeFromStorage()`
- **Events:** `debounce()`, `throttle()`
- **Scroll:** `scrollToTop()`, `scrollToElement()`

## 🎨 Design System

### Colors

- **Primary:** `#BF4254` (Simplications Red)
- **Dark:** `#2C2E35`
- **Gray:** `#84888E`
- **Light:** `#F7F7F8`
- **Success:** `#2E7D32`
- **Warning:** `#F57C00`
- **Danger:** `#C62828`

### Typography

- **Font:** System font stack (SF Pro, Segoe UI, Roboto, etc.)
- **Line height:** 1.6
- **Headings:** Bold, -0.5px letter-spacing

### Spacing

- **Border radius:** 8px (default), 4px (small), 16px (large)
- **Shadows:** sm, md, lg
- **Transitions:** fast (0.2s), medium (0.3s), slow (0.5s)

## 🤝 Contributing

When adding features or new games:

1. Follow the established naming convention
2. Use common.css variables and utilities
3. Keep game-specific styles in separate CSS files
4. Document your code with comments
5. Test across browsers and devices
6. Update this README if adding new games

## 📄 License

See `LICENSE` file for details.

## 🔗 Links

- [Simplications Website](https://simplications.tucmi.de)
- [TU Chemnitz - Mensch-Computer Interaktion](https://www.tu-chemnitz.de/informatik/mc/)

---

Made with ❤️ for privacy education
