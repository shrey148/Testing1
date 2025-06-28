const CRIC_API_KEY = 'YOUR_CRIC_API_KEY';
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';

async function fetchScores() {
  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${CRIC_API_KEY}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const scoresEl = document.getElementById('scores');
    scoresEl.innerHTML = '';
    if (data && data.data) {
      data.data.slice(0, 5).forEach(match => {
        const div = document.createElement('div');
        div.textContent = `${match.name}: ${match.status}`;
        scoresEl.appendChild(div);
      });
    } else {
      scoresEl.textContent = 'No data';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('scores').textContent = 'Error fetching scores';
  }
}

async function fetchHighlights() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=cricket%20highlights&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const videosEl = document.getElementById('videos');
    videosEl.innerHTML = '';
    if (data && data.items) {
      data.items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
        a.textContent = item.snippet.title;
        a.target = '_blank';
        li.appendChild(a);
        videosEl.appendChild(li);
      });
    } else {
      videosEl.textContent = 'No highlights found';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('videos').textContent = 'Error fetching highlights';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchScores();
  fetchHighlights();
});
