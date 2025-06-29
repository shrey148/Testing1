// Automatically save clipboard text on copy
// Listens for copy events and stores clipboard history

document.addEventListener('copy', e => {
  chrome.storage.local.get({ autoSave: true, history: [] }, data => {
    if (!data.autoSave) return;
    const text = e.clipboardData.getData('text/plain');
    if (!text) return;
    const history = data.history;
    history.unshift(text);
    chrome.storage.local.set({ history });
  });
});
