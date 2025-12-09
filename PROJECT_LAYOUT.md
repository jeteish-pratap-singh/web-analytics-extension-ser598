# Project Layout & Execution Guide

This document explains the folder structure of the project and instructions on how to run each component.

## Folder Structure

* **`docs/` (The Tutorial Write-Up)**
  * Contains the complete educational website.
  * **Files:** `index.html`, `getting-started.html`, `tutorial.html`, `analysis.html`.
* **`basic/` (Demo 1: Hello World)**
  * The simple "Hands On" extension created in the "Getting Started" section.
  * Contains: `manifest.json`, `popup.html`, `popup.js`.
* **`src/` (Demo 2: Advanced Analytics Tool)**
  * The source code for the main "Web Analytics & Observability" extension using Vue.js.
  * Contains: `background.js` (Service Worker), `App.vue` (UI), `trackerList.js`.
* **`presentation_script.md`**
  * The script and outline for the final presentation.

---

## How to Run the Components

### 1. View the Tutorial Website (Write-Up)

The tutorial is a static website. You do not need a server to run it.

1. Navigate to the `docs/` folder.
2. Double-click **`index.html`** to open it in your browser.
3. Use the navigation bar to move between "Getting Started", "Tutorial", and "Analysis".

### 2. Run the "Basic" Extension

This is the simple example from the "Getting Started" guide.

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer Mode** (top right toggle).
3. Click **Load Unpacked**.
4. Select the **`basic/`** folder from this project.
5. Pin the extension and click it to see the "Hello World" popup.

### 3. Run the "Advanced" Extension (Vue.js)

This is the main project demo. It requires Node.js to build.

**Step A: Build the Project**

1. Open a terminal in the root directory.
2. Run `npm install` to install dependencies (Vue, Vite).
3. Run `npm run build`.
    * This will create a **`dist/`** folder containing the compiled extension.

**Step B: Load into Chrome**

1. Open Chrome and go to `chrome://extensions`.
2. Ensure **Developer Mode** is enabled.
3. Click **Load Unpacked**.
4. Select the newly created **`dist/`** folder.
    * *Note: Do not select `src/`. You must select `dist/`.*
5. Browse the web! The extension icon will show a number indicating tracking requests blocked/monitored.

---

## Deliverable Compliance

* **Write-Up:** Located in `docs/`. Meets the "Web Pages" requirement.
* **Demo:** Located in `src/` (Source) and `dist/` (Build). Meets the "GitHub Repository" requirement.
* **Analytical Component:** Located in `docs/analysis.html`.
* **Presentation:** Script located in `presentation_script.md`.
