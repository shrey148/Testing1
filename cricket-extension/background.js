chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('updateScores', { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateScores') {
    chrome.action.setBadgeText({ text: '...' });
    fetch(`https://api.cricapi.com/v1/currentMatches?apikey=YOUR_CRIC_API_KEY`)
      .then(resp => resp.json())
      .then(() => {
        chrome.action.setBadgeText({ text: '' });
      })
      .catch(() => {
        chrome.action.setBadgeText({ text: '!' });
      });
  }
});
