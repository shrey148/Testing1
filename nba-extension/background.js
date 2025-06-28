async function safeJsonFetch(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }
    const type = resp.headers.get('content-type') || '';
    if (!type.includes('application/json')) {
      throw new Error('invalid type');
    }
    return await resp.json();
  } catch (e) {
    console.error('Fetch failed for', url, e);
    return null;
  }
}

async function fetchLatestGame() {
  const currentYear = new Date().getFullYear();
  for (let offset = 0; offset < 3; offset++) {
    const season = currentYear - offset;
    const url = `https://www.balldontlie.io/api/v1/games?postseason=true&per_page=1&seasons[]=${season}`;
    const data = await safeJsonFetch(url);
    if (data && data.data && data.data.length) {
      return data.data[0];
    }
  }
  return null;
}

chrome.runtime.onInstalled.addListener(() => {
  if (chrome.alarms && chrome.alarms.create) {
    chrome.alarms.create('updateNBA', { periodInMinutes: 10 });
  }
});

if (chrome.alarms && chrome.alarms.onAlarm) {
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'updateNBA') {
      if (chrome.action && chrome.action.setBadgeText) {
        chrome.action.setBadgeText({ text: '...' });
        const game = await fetchLatestGame();
        chrome.action.setBadgeText({ text: game ? '' : '!' });
      }
    }
  });
}
