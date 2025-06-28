chrome.runtime.onInstalled.addListener(() => {
  if (chrome.alarms && chrome.alarms.create) {
    chrome.alarms.create('updateNBA', { periodInMinutes: 10 });
  }
});

if (chrome.alarms && chrome.alarms.onAlarm) {
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'updateNBA') {
      chrome.action && chrome.action.setBadgeText({ text: '...' });
      fetch('https://www.balldontlie.io/api/v1/games?per_page=1')
        .then(resp => {
          if (!resp.ok) {
            throw new Error('status ' + resp.status);
          }
          const type = resp.headers.get('content-type') || '';
          if (!type.includes('application/json')) {
            throw new Error('invalid type');
          }
          return resp.json();
        })
        .then(() => {
          chrome.action && chrome.action.setBadgeText({ text: '' });
        })
        .catch(() => {
          chrome.action && chrome.action.setBadgeText({ text: '!' });
        });
    }
  });
}
