# SER598 Advanced Project - Group 4 

## Write up and Follow Along steps
Can be found under docs/index.html

## Tutorial
Step by Step instructions can be found under basic/ and tutorial/ directory

## Demo
### Web Analytics & Observability Extension
A Vue 3.0 Chrome Extension that allows users to monitor network traffic in real-time, visualizing requests and detecting trackers.

## Features

- **Real-time Monitoring**: Captures HTTP requests for the active tab.
- **Tracker Detection**: Identifies known tracking domains (e.g., Google Analytics).
- **Data Visualization**: Shows latency, size, and method for each request.
- **Vue 3 UI**: Reactive interface built with Vite + Vue 3.

## Installation Instructions

1. **Build the Project**:
    You must build the Vue app first to generate the extension files.

    ```sh
    npm install
    npm run build
    ```

    This will create a `dist/` folder.

2. **Load into Chrome**:
    - Open Chrome and navigate to `chrome://extensions`.
    - Toggle **Developer Mode** (top right corner).
    - Click **Load Unpacked**.
    - Select the `dist/` folder inside this project directory.

3. **Run the Demo**:
    - Open a new tab and visit any website (e.g., `cnn.com`).
    - Click the Extension Icon in the toolbar.
    - You will see the requests populating in the table.

## Development

- `npm run dev`: Hot-reload for UI development (note: may require rebuilding for full extension context).
- `src/trackerList.js`: Modify this file to add more tracker domains.
