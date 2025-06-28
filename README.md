# Testing1

This repository contains a sample Chrome extension that displays live cricket scores with YouTube highlight recommendations.

## Extension Setup

1. Get API keys:
   - **Cricket API**: Sign up at [cricapi.com](https://www.cricapi.com/) and obtain an API key.
   - **YouTube Data API**: Create a project on [Google Cloud](https://console.cloud.google.com/) and generate an API key for the YouTube Data API v3.
2. Replace the placeholders `YOUR_CRIC_API_KEY` and `YOUR_YOUTUBE_API_KEY` in `cricket-extension/popup.js` with your keys.
3. Open Chrome and navigate to `chrome://extensions`.
4. Enable **Developer mode** and choose **Load unpacked**.
5. Select the `cricket-extension` folder to install the extension.
6. Click the extension icon to view live scores and video highlights.

The code is provided under the MIT License located in `LICENSE`.

## NBA Playoff Tracker Extension

This repository also includes a Chrome extension that shows the latest NBA playoff game information. The extension fetches the most recent postseason matchup, displays a short summary, top YouTube highlights and leading scorers.

### Setup
1. Obtain a YouTube Data API v3 key.
2. Replace `YOUR_YOUTUBE_API_KEY` in `nba-extension/popup.js` with your key.
3. Open Chrome and navigate to `chrome://extensions`.
4. Enable **Developer mode** and select **Load unpacked**.
5. Choose the `nba-extension` folder.
6. Click the extension icon to view game details.
