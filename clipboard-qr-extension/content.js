// Automatically save clipboard text on copy
// Listens for copy events and stores clipboard history

document.addEventListener('copy', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (!text) return;
    chrome.storage.local.get({ history: [] }, data => {
      const history = data.history;
      history.unshift(text);
      chrome.storage.local.set({ history });
    });
  } catch (err) {
    console.error('Failed to read clipboard', err);
  }
});
