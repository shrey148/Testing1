function showQR(text) {
  const img = document.getElementById('qr');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
}

function updateHistory(history) {
  const ul = document.getElementById('history');
  ul.innerHTML = '';
  history.slice(0, 5).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

async function saveClipboard() {
  const status = document.getElementById('status');
  try {
    const text = await navigator.clipboard.readText();
    if (!text) {
      status.textContent = 'Clipboard is empty';
      return;
    }
    chrome.storage.local.get({ history: [] }, data => {
      const history = data.history;
      history.unshift(text);
      chrome.storage.local.set({ history }, () => {
        status.textContent = 'Saved!';
        showQR(text);
        updateHistory(history);
      });
    });
  } catch (e) {
    console.error(e);
    status.textContent = 'Failed to read clipboard';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('autoSaveToggle');
  document.getElementById('saveBtn').addEventListener('click', saveClipboard);
  chrome.storage.local.get({ history: [], autoSave: true }, data => {
    updateHistory(data.history);
    if (data.history.length) {
      showQR(data.history[0]);
    }
    toggle.checked = data.autoSave;
  });

  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ autoSave: toggle.checked });
  });
});
