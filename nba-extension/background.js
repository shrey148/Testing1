chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('updateNBA', { periodInMinutes: 10 });
});

if (chrome.alarms) {
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'updateNBA') {
      chrome.action.setBadgeText({ text: '...' });
      fetch('https://www.balldontlie.io/api/v1/games?per_page=1')
        .then(resp => resp.json())
        .then(() => {
          chrome.action.setBadgeText({ text: '' });
        })
        .catch(() => {
          chrome.action.setBadgeText({ text: '!' });
        });
    }
  });
}
