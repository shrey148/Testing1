// Automatically save clipboard text on copy
// Listens for copy events and stores clipboard history

document.addEventListener('copy', () => {
  chrome.storage.local.get({ autoSave: true, history: [] }, async data => {
    if (!data.autoSave) return;
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;
      const history = data.history;
      history.unshift(text);
      chrome.storage.local.set({ history });
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  });
});
