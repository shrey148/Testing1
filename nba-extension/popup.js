async function safeJsonFetch(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }
    const type = resp.headers.get('content-type') || '';
    if (!type.includes('application/json')) {
      throw new Error('Invalid content type');
    }
    return await resp.json();
  } catch (e) {
    console.error('Fetch failed for', url, e);
    return null;
  }
}

async function fetchLatestGame() {
  const data = await safeJsonFetch('https://www.balldontlie.io/api/v1/games?postseason=true&per_page=1');
  return data && data.data && data.data.length ? data.data[0] : null;
}

async function fetchGameStats(gameId) {
  const data = await safeJsonFetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameId}&per_page=100`);
  return data && data.data ? data.data : [];
}

async function fetchHighlights(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=YOUR_YOUTUBE_API_KEY`;
  const data = await safeJsonFetch(url);
  return data && data.items ? data.items : [];
}

function summarizePlays(game, stats) {
  if (!game) return 'No game data available.';
  const homePoints = game.home_team_score;
  const visitorPoints = game.visitor_team_score;
  const winner = homePoints > visitorPoints ? game.home_team.full_name : game.visitor_team.full_name;
  return `${winner} won ${homePoints}-${visitorPoints}.`;
}

function displayGame(game) {
  const gameEl = document.getElementById('game');
  if (!game) {
    gameEl.textContent = 'No recent playoff games found.';
    return;
  }
  gameEl.textContent = `${game.home_team.full_name} vs ${game.visitor_team.full_name} on ${game.date.slice(0,10)}`;
}

function displaySummary(summary) {
  document.getElementById('summary').textContent = summary;
}

function displayStats(stats) {
  const statsEl = document.getElementById('stats');
  statsEl.innerHTML = '';
  if (!stats.length) {
    statsEl.textContent = 'No stats available.';
    return;
  }
  const top = {};
  stats.forEach(s => {
    const team = s.team.full_name;
    if (!top[team] || s.pts > top[team].pts) {
      top[team] = { player: `${s.player.first_name} ${s.player.last_name}`, pts: s.pts };
    }
  });
  Object.keys(top).forEach(team => {
    const div = document.createElement('div');
    div.textContent = `${team}: Top scorer ${top[team].player} with ${top[team].pts} pts`;
    statsEl.appendChild(div);
  });
}

function displayVideos(videos) {
  const videosEl = document.getElementById('videos');
  videosEl.innerHTML = '';
  if (!videos.length) {
    videosEl.textContent = 'No videos found.';
    return;
  }
  videos.forEach(v => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `https://www.youtube.com/watch?v=${v.id.videoId}`;
    a.textContent = v.snippet.title;
    a.target = '_blank';
    li.appendChild(a);
    videosEl.appendChild(li);
  });
}

async function init() {
  const game = await fetchLatestGame();
  displayGame(game);
  if (!game) return;
  const stats = await fetchGameStats(game.id);
  const summary = summarizePlays(game, stats);
  displaySummary(summary);
  displayStats(stats);
  const query = `${game.home_team.full_name} vs ${game.visitor_team.full_name} playoffs highlights`;
  const videos = await fetchHighlights(query);
  displayVideos(videos);
}

document.addEventListener('DOMContentLoaded', init);
