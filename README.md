# Simplications Outreach Games

Interactive educational games about data privacy and IoT devices for the Simplications project.

## 📁 File Structure

### Game Files

Interactive games use the naming convention `{game-name}-game.{ext}`. Standalone reference pages can use descriptive names such as `massnahmenkatalog.{ext}`.

#### Memory Game (Daten-Memory)

- `pages/memory-game.html` - Memory matching game HTML
- `assets/css/memory-game.css` - Memory game-specific styles
- `assets/js/memory-game.js` - Memory game logic and data

#### Fallbeispiele-Memory

Pairs short text case studies with real sensor-data images.

- `pages/fallbeispiele-memory-game.html` - Fallbeispiele memory game HTML
- `assets/css/fallbeispiele-memory-game.css` - Game-specific styles
- `assets/js/fallbeispiele-memory-game.js` - Game logic and case-study data (images in `data/Fallbeispiele_Daten/`; `data/Fallbeispiele.txt` is the plain-text source of the case studies and is not loaded at runtime)

#### Sensorium Game (Was siehst DU?)

Not linked from the hub page (`index.html`); reachable only by opening its page directly.

- `pages/sensorium-game.html` - Sensorium perspective game HTML
- `assets/css/sensorium-game.css` - Sensorium game-specific styles
- `assets/js/sensorium-game.js` - Sensorium game logic and scenarios

#### Maßnahmenkatalog

- `pages/massnahmenkatalog.html` - Overview page for privacy measures in the smart home
- `assets/css/massnahmenkatalog.css` - Maßnahmenkatalog-specific styles
- `assets/js/massnahmenkatalog.js` - Structured rendering of lifecycle-based measures

#### Beispiel-Checkliste Smart Home

- `pages/checkliste-smart-home.html` - Example checklist for rooms, devices, and data flows in the household
- `assets/css/checkliste-smart-home.css` - Checklist-specific styles
- `assets/js/checkliste-smart-home.js` - Structured rendering of example rooms and devices

#### Konsens-Protokoll

- `pages/konsens-protokoll.html` - Fillable household agreement template
- `assets/css/konsens-protokoll.css` - Protocol-specific styles
- `assets/js/konsens-protokoll.js` - PDF export (jsPDF + autoTable, loaded from cdnjs)

### Shared Files

- `assets/css/common.css` - Shared styles (colors, typography, buttons, focus ring, zoom modal, `.sr-only`, animations, global "DEMO" ribbon)
- `assets/js/common.js` - Shared utility functions (`shuffleArray`, `scrollToTop`)

### Other Files

- `index.html` - Main hub page linking to games and serious content
- `assets/css/index.css` - Hub page styles
- `checkliste-smart-home.html`, `konsens-protokoll.html`, `massnahmenkatalog.html` (repo root) - Redirect stubs to the pages in `pages/`, kept so older links keep working
- `README.md` - This file
- `LICENSE` - Project license

## 🎮 Games

### 1. Daten-Memory (Memory Game)

Match data visualizations with the stories they tell. Players must connect graphs with their corresponding narratives to understand data interpretation.

**File:** `pages/memory-game.html`

**Features:**

- 6 matching pairs (graphs + stories)
- Dynamic SVG graph generation
- Flip animations
- Statistics tracking
- Fullscreen mode
- Keyboard-playable cards (Tab, Enter/Space)

### 2. Sensorium (Perspective Game)

Discover the two perspectives of data collection - what you think you're sharing vs. what's actually being collected.

**File:** `pages/sensorium-game.html` (not linked from the hub page)

**Features:**

- 3 IoT device scenarios (Smart Speaker, Smoke Detector, Smart TV)
- Dual perspective switching
- Data comparison reveals
- Educational insights
- Progressive scenario navigation

### 3. Maßnahmenkatalog

A structured overview of social and technical privacy measures for consumers as well as manufacturers and developers, grouped by product lifecycle phase.

**File:** `pages/massnahmenkatalog.html`

**Features:**

- Lifecycle-based structure (before purchase, setup, use, disposal)
- Separate perspectives for consumers and product teams
- Distinction between social and technical measures
- Additional security best practices section

### 4. Beispiel-Checkliste Smart Home

An example audit checklist that helps users inspect which smart devices exist in each room, which data they collect, where data is stored, and where it is sent.

**File:** `pages/checkliste-smart-home.html`

**Features:**

- Room-by-room structure
- Example devices and typical data categories
- Separate columns for collection, storage, and transmission
- Embedded audit questions for household review

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
   - Or directly open `pages/memory-game.html` or `pages/sensorium-game.html`

## 🛠️ Adding a New Game

1. **Create game files following the naming convention:**

   ```cmd
   pages/new-game-name.html
   assets/css/new-game-name.css
   assets/js/new-game-name.js
   ```

2. **Include shared files in your HTML:**

   ```html
   <link rel="stylesheet" href="../assets/css/common.css">
   <link rel="stylesheet" href="../assets/css/new-game-name.css">
   
   <script src="../assets/js/common.js"></script>
   <script src="../assets/js/new-game-name.js"></script>
   ```

## 📦 Common Resources

### assets/css/common.css

Provides:

- CSS variables (colors, shadows, transitions)
- Base reset and typography
- Header/footer styles
- Button styles (`.btn-primary`, `.btn-secondary`)
- Common animations (`fadeIn`, `fadeInUp`, `pulse`, `bounce`)
- Utility classes (`.fade-in`, `.text-center`, `.hidden`)

### assets/js/common.js

Provides utility functions:

- **Arrays:** `shuffleArray()` (returns a new array, does not mutate)
- **Scroll:** `scrollToTop()`

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
- [TU Chemnitz - Medieninformatik](https://www.tu-chemnitz.de/informatik/mi/)

---

Made with ❤️ for privacy education
