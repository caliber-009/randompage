// Tabs
const shell = document.getElementById('shell');
const tabButtons = document.querySelectorAll('.browser-tab[data-tab]');
const panels = document.querySelectorAll('.tab-panel');
const closeButtons = document.querySelectorAll('.tab-close[data-close]');
const minBtn = document.getElementById('minBtn');
const maxBtn = document.getElementById('maxBtn');
const closeBtn = document.getElementById('closeBtn');
const toastStack = document.getElementById('toastStack');

const randomMessages = [
  { text: 'Window says: absolutely not.', rarity: 'common' },
  { text: 'Tab gremlin has been spotted.', rarity: 'common' },
  { text: 'This button is on vacation.', rarity: 'common' },
  { text: 'You clicked the shiny thing.', rarity: 'common' },
  { text: 'Chrome spirit approves this chaos.', rarity: 'common' },
  { text: 'The tabs are mildly concerned.', rarity: 'common' },
  { text: 'Popup avoided. Good reflexes.', rarity: 'common' },
  { text: 'Minimize achieved. Meaning: none.', rarity: 'common' },
  { text: 'Fullscreen mode: emotionally prepared.', rarity: 'common' },
  { text: 'Close button: still unionized.', rarity: 'common' },

  { text: 'A tiny beep echoes from the void.', rarity: 'common' },
  { text: 'Mouse cursor feels judged.', rarity: 'common' },
  { text: 'The browser tab blinks once.', rarity: 'common' },
  { text: 'A static poppet approves.', rarity: 'common' },
  { text: 'Nothing happened, which is something.', rarity: 'common' },
  { text: 'The page is wearing its serious face.', rarity: 'common' },
  { text: 'Chrome window consumed by thoughts.', rarity: 'common' },
  { text: 'The alert daemon yawns.', rarity: 'common' },
  { text: 'This is a legally distinct window.', rarity: 'common' },
  { text: 'Somewhere, a close icon giggles.', rarity: 'common' },

  { text: 'Medium rarity event: button confidence up.', rarity: 'uncommon' },
  { text: 'The tab strip has entered its dramatic era.', rarity: 'uncommon' },
  { text: 'A notification almost happened.', rarity: 'uncommon' },
  { text: 'Your click summoned a polite void.', rarity: 'uncommon' },
  { text: 'Full screen would like a coffee break.', rarity: 'uncommon' },
  { text: 'A phantom page tried to load.', rarity: 'uncommon' },
  { text: 'The window frame says: trust issues.', rarity: 'uncommon' },
  { text: 'The browser goblin took attendance.', rarity: 'uncommon' },
  { text: 'A tab separator has feelings too.', rarity: 'uncommon' },
  { text: 'The alert smelled like pixels.', rarity: 'uncommon' },

  { text: 'Rare event unlocked: tiny thunderclap.', rarity: 'rare' },
  { text: 'The maximize button achieved enlightenment.', rarity: 'rare' },
  { text: 'The close icon blinked in Morse code.', rarity: 'rare' },
  { text: 'You found a suspiciously fancy alert.', rarity: 'rare' },
  { text: 'The window briefly became aware.', rarity: 'rare' },
  { text: 'A rare tab myth was witnessed.', rarity: 'rare' },
  { text: 'The shell has spawned a rumor.', rarity: 'rare' },
  { text: 'Some pixels bowed respectfully.', rarity: 'rare' },
  { text: 'The browser moonwalked for one frame.', rarity: 'rare' },
  { text: 'A rare beep with ancestral energy.', rarity: 'rare' },

  { text: 'Ultra rare: the window whispered “hi”.', rarity: 'epic' },
  { text: 'Legendary alert: no one expected this.', rarity: 'epic' },
  { text: 'Mythic response: the tab is watching.', rarity: 'epic' },
  { text: 'The chrome frame ascended.', rarity: 'epic' },
  { text: 'Ultra rare chaos event detected.', rarity: 'epic' },
  { text: 'The minimize button briefly learned flight.', rarity: 'epic' },
  { text: 'A perfect alert was forged somewhere.', rarity: 'epic' },
  { text: 'The browser gods are mildly amused.', rarity: 'epic' },
  { text: 'A clean, impossible click resonance.', rarity: 'epic' },
  { text: 'Window boss fight music starts, then stops.', rarity: 'epic' },

  { text: 'Chrome legend: the tab developed lore.', rarity: 'legendary' },
  { text: 'Obscure miracle: the shell sighed.', rarity: 'legendary' },
  { text: 'A once-in-a-blue-moon alert emerged.', rarity: 'legendary' },
  { text: 'The close button formed a prophecy.', rarity: 'legendary' },
  { text: 'The tab strip has transcended UI.', rarity: 'legendary' },
  { text: 'An ancient window rune activated.', rarity: 'legendary' },
  { text: 'Someone will screenshot this later.', rarity: 'legendary' },
  { text: 'The frame cracked with prestige.', rarity: 'legendary' },
  { text: 'You have discovered a rare browser relic.', rarity: 'legendary' },
  { text: 'A legendary ding from beyond the monitor.', rarity: 'legendary' },

  { text: 'Transcendent rarity: the tab smiled back.', rarity: 'mythic' },
  { text: 'Mythic alert: the window now has opinions.', rarity: 'mythic' },
  { text: 'A singularity of browser nonsense occurred.', rarity: 'mythic' },
  { text: 'The maximize button became a comet.', rarity: 'mythic' },
  { text: 'This alert may be older than the internet.', rarity: 'mythic' },
  { text: 'The shell gently folded space-time.', rarity: 'mythic' },
  { text: 'A mythic whisper came through the frame.', rarity: 'mythic' },
  { text: 'The tab strip opened a portal to more tabs.', rarity: 'mythic' },
  { text: 'The close icon achieved enlightenment and left.', rarity: 'mythic' },
  { text: 'An impossible click was recorded.', rarity: 'mythic' }
];

function weightedRarityPick() {
  const pools = {
    common: 58,
    uncommon: 24,
    rare: 9,
    epic: 5,
    legendary: 2,
    mythic: 1
  };

  const roll = Math.random() * 100;
  let acc = 0;

  const order = [
    ['common', pools.common],
    ['uncommon', pools.uncommon],
    ['rare', pools.rare],
    ['epic', pools.epic],
    ['legendary', pools.legendary],
    ['mythic', pools.mythic]
  ];

  for (const [rarity, weight] of order) {
    acc += weight;
    if (roll < acc) return rarity;
  }

  return 'common';
}

function randomAlertMessage() {
  const rarity = weightedRarityPick();
  const pool = randomMessages.filter(item => item.rarity === rarity);
  const picked = pool[Math.floor(Math.random() * pool.length)];
  alert(`${picked.text} [${picked.rarity.toUpperCase()}]`);
  unlockAchievementByAlert(rarity);
}

function openTab(id) {
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
  tabButtons.forEach(btn => {
    const active = btn.dataset.tab === id;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  if (id === 'tab-2') renderBoard();
  if (id === 'tab-3') renderAchievements();
}

tabButtons.forEach(btn => btn.addEventListener('click', () => openTab(btn.dataset.tab)));
closeButtons.forEach(btn =>
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    randomAlertMessage();
  })
);
minBtn.addEventListener('click', randomAlertMessage);
maxBtn.addEventListener('click', randomAlertMessage);
closeBtn.addEventListener('click', randomAlertMessage);

// Evil meter
setTimeout(() => {
  const fill = document.getElementById('evilFill');
  const text = document.getElementById('evilText');
  if (fill && text) {
    fill.style.width = '97%';
    text.innerText = 'EVIL LEVEL: EVILSTEVILEVIL EVER EVIL!! ASHES TO ASHES DUST TO DUST!!!';
  }
}, 800);

const evilAudio = new Audio('./ImagesAudiosandVideos/THISBEATISSOFIREEE.wav');
evilAudio.loop = true;

let isEvil = false;

function playEvil() {
  isEvil = !isEvil;

  if (isEvil) {
    evilAudio.play().catch(() => console.log('User interaction required first'));
    alert('your ears have been permanently damaged');
  } else {
    evilAudio.pause();
  }
}

// Tic Tac Toe
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const modeSelect = document.getElementById('modeSelect');
const resetBtn = document.getElementById('resetBtn');
const xWinsEl = document.getElementById('xWins');
const oWinsEl = document.getElementById('oWins');
const drawsEl = document.getElementById('draws');
const tttPanel = document.getElementById('tttPanel');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0, D: 0 };

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function clearTTTTheme() {
  shell.classList.remove('ttt-theme-x', 'ttt-theme-o');
}

function applyTTTTheme(result) {
  clearTTTTheme();
  if (result === 'X') shell.classList.add('ttt-theme-x');
  if (result === 'O') shell.classList.add('ttt-theme-o');
}

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((value, i) => {
    const button = document.createElement('button');
    button.className = 'cell';
    button.textContent = value;
    button.setAttribute('aria-label', `cell ${i + 1}`);
    button.disabled = gameOver || !!value;
    button.addEventListener('click', () => handleMove(i));
    boardEl.appendChild(button);
  });
  updateStatus();
}

function updateStatus(message) {
  if (message) {
    statusEl.textContent = message;
    return;
  }
  if (gameOver) return;
  statusEl.textContent = `${currentPlayer}'s turn.`;
}

function checkWinner(state) {
  for (const [a, b, c] of wins) {
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a];
    }
  }
  return state.every(cell => cell) ? 'D' : null;
}

function endGame(result) {
  gameOver = true;

  if (result === 'D') {
    scores.D++;
    drawsEl.textContent = scores.D;
    clearTTTTheme();
    updateStatus('Draw. Nobody got the final cringe move.');
  } else {
    scores[result]++;
    if (result === 'X') xWinsEl.textContent = scores.X;
    if (result === 'O') oWinsEl.textContent = scores.O;
    applyTTTTheme(result);
    updateStatus(`Winner: ${result}`);
  }

  renderBoard();
  statusEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function handleMove(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  const result = checkWinner(board);
  renderBoard();

  if (result) {
    endGame(result);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();

  if (modeSelect.value === 'bot' && currentPlayer === 'O' && !gameOver) {
    setTimeout(botMove, 260);
  }
}

function botMove() {
  if (gameOver) return;

  const choices = board.map((v, i) => (v ? null : i)).filter(v => v !== null);
  if (!choices.length) return;

  const pick = choices[Math.floor(Math.random() * choices.length)];
  handleMove(pick);
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  clearTTTTheme();
  updateStatus('X starts.');
  renderBoard();
}

modeSelect.addEventListener('change', resetGame);
resetBtn.addEventListener('click', resetGame);

// Achievements
const achievementDefs = [
  {
    id: 'welcome',
    name: 'Welcome!',
    desc: 'Enter the website. How simple.',
    series: 'Main web series',
    seriesKey: 'main web series',
    rarity: 'common',
    icon: '🏠'
  },
  {
    id: 'luck-common',
    name: 'Common',
    desc: 'Get a common alert. Nothing more.',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'common',
    icon: '⚪'
  },
  {
    id: 'luck-uncommon',
    name: 'Uncommon',
    desc: 'Get an uncommon alert. Nothing much.',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'uncommon',
    icon: '🟢'
  },
  {
    id: 'luck-rare',
    name: 'Rare',
    desc: 'Get a rare alert. Getting pretty lucky eh?',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'rare',
    icon: '🔵'
  },
  {
    id: 'luck-epic',
    name: 'Epic',
    desc: 'Get an epic alert. GAMBLEGAMBLEGAMBLEGAMBLE!!!!',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'epic',
    icon: './ImagesAudiosandVideos/Epic.jpeg'
  },
  {
    id: 'luck-legendary',
    name: 'Legendary',
    desc: 'Get a legendary alert. WINNER!!!',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'legendary',
    icon: './ImagesAudiosandVideos/Legendary.jpeg'
  },
  {
    id: 'luck-mythic',
    name: 'MYTHIC',
    desc: 'Somehow get the mythical alert. Congrats lucky guy!',
    series: 'Luck series',
    seriesKey: 'luck series',
    rarity: 'mythic',
    icon: './ImagesAudiosandVideos/Mythic.jpeg'
  },
  {
    id: 'secret-secret1',
    name: 'Barely a Secret',
    desc: 'Find a secret somewhere in the Exposal Tab.',
    series: 'Secret series',
    seriesKey: 'secret series',
    rarity: 'common',
    icon: '?'
  },
  {
    id: 'secret-secret2',
    name: 'Semi-Secret',
    desc: 'What is the elephant in the room? Or I mean, Where?',
    series: 'Secret series',
    seriesKey: 'secret series',
    rarity: 'uncommon',
    icon: '??'
  },
  {
    id: 'secret-secret3',
    name: 'Secret',
    desc: 'What if you "Inspect"?',
    series: 'Secret series',
    seriesKey: 'secret series',
    rarity: 'rare',
    icon: '???'
  },
  {
    id: 'gd',
    name: 'Our Geometry Dash',
    desc: 'Enter literally every vault of secrets code available in gd',
    series: 'Main web series',
    seriesKey: 'main web series',
    rarity: 'rare',
    icon: './ImagesAudiosandVideos/OurGeometryDash.jpeg'
  },
  {
    id: 'coin',
    name: 'Glubfub',
    desc: 'THIEF! THIEF!',
    series: 'Main web series',
    seriesKey: 'main web series',
    rarity: 'uncommon',
    icon: './ImagesAudiosandVideos/Glubfub.gif'
  }
];

const seriesIcons = {
  'main web series': 'https://static.thenounproject.com/png/4815663-200.png',
  'luck series': 'https://static.wikia.nocookie.net/enfuturama/images/b/b2/Seven_leaf_clover.jpg/revision/latest?cb=20090716004755',
  'secret series': 'https://static.wikia.nocookie.net/findthechomiks-rbx/images/8/87/SecretSeriesIcon.png/revision/latest?cb=20260211223713'
};

const achievementSearch = document.getElementById('achievementSearch');
const seriesFilter = document.getElementById('seriesFilter');
const achievementGrid = document.getElementById('achievementGrid');
const ACHIEVEMENT_STORAGE_KEY = 'houseofkindness_achievements_v1';

const rarityLabels = {
  common: 'COMMON',
  uncommon: 'UNCOMMON',
  rare: 'RARE',
  epic: 'EPIC',
  legendary: 'LEGENDARY',
  mythic: 'MYTHIC'
};

const achievementMeta = {
  common: { label: 'common', colorClass: 'common' },
  uncommon: { label: 'uncommon', colorClass: 'uncommon' },
  rare: { label: 'rare', colorClass: 'rare' },
  epic: { label: 'epic', colorClass: 'epic' },
  legendary: { label: 'legendary', colorClass: 'legendary' },
  mythic: { label: 'mythic', colorClass: 'mythic' },
  mythical: { label: 'mythic', colorClass: 'mythic' }
};

let unlockedAchievements = new Set();
let achievementCards = new Map();

function loadAchievements() {
  try {
    const raw = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    unlockedAchievements = new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    unlockedAchievements = new Set();
  }
}

function saveAchievements() {
  localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify([...unlockedAchievements]));
}

function playUnlockSfx() {
  const sfx = new Audio('https://www.image2url.com/r2/default/audio/1777542077123-29e89b0c-2257-4b14-a012-70da1fff2860.mp3');
  sfx.volume = 0.9;
  sfx.play().catch(() => {});
}

function getRarityMeta(rarity) {
  return achievementMeta[rarity] || achievementMeta.common;
}

function isImageSrc(src) {
  return typeof src === 'string' && /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(src);
}

function showToast(ach) {
  const meta = getRarityMeta(ach.rarity);

  const toast = document.createElement('div');
  toast.className = `toast ${meta.colorClass}`;

  const iconWrap = document.createElement('div');
  iconWrap.className = 'toast-icon';

  if (isImageSrc(ach.icon)) {
    const img = document.createElement('img');
    img.src = ach.icon;
    img.alt = '';
    img.onerror = () => {
      iconWrap.textContent = '🏆';
    };
    iconWrap.appendChild(img);
  } else {
    iconWrap.textContent = ach.icon || '🏆';
  }

  const copy = document.createElement('div');
  copy.className = 'toast-copy';
  copy.innerHTML = `
    <div class="toast-title">Achievement Unlocked</div>
    <div class="toast-desc"></div>
  `;
  copy.querySelector('.toast-desc').textContent = ach.name;

  toast.appendChild(iconWrap);
  toast.appendChild(copy);
  toastStack.appendChild(toast);

  setTimeout(() => toast.remove(), 3900);
}

function unlockAchievement(id, silent = false) {
  const ach = achievementDefs.find(a => a.id === id);
  if (!ach || unlockedAchievements.has(id)) return false;

  unlockedAchievements.add(id);
  saveAchievements();
  renderAchievementCard(id);

  if (!silent) {
    playUnlockSfx();
    showToast(ach);
  }

  return true;
}

function unlockAchievementByAlert(rarity) {
  if (rarity === 'common') unlockAchievement('luck-common');
  if (rarity === 'uncommon') unlockAchievement('luck-uncommon');
  if (rarity === 'rare') unlockAchievement('luck-rare');
  if (rarity === 'epic') unlockAchievement('luck-epic');
  if (rarity === 'legendary') unlockAchievement('luck-legendary');
  if (rarity === 'mythic' || rarity === 'mythical') unlockAchievement('luck-mythic');
  renderAchievements();
}

function buildAchievementCard(ach) {
  const card = document.createElement('div');
  card.className = 'achievement-card';
  card.dataset.id = ach.id;
  card.innerHTML = `
    <div class="achievement-badge locked" data-badge></div>
    <div class="achievement-head">
      <div class="achievement-name" data-name></div>
      <img class="series-icon" data-series-icon alt="">
    </div>
    <div class="achievement-desc" data-desc></div>
    <div class="achievement-state" data-state>Locked</div>
  `;

  achievementCards.set(ach.id, card);
  achievementGrid.appendChild(card);
  renderAchievementCard(ach.id);
}

function renderAchievementCard(id) {
  const ach = achievementDefs.find(a => a.id === id);
  const card = achievementCards.get(id);
  if (!ach || !card) return;

  const unlocked = unlockedAchievements.has(id);
  const meta = getRarityMeta(ach.rarity);

  const badge = card.querySelector('[data-badge]');
  const seriesIconEl = card.querySelector('[data-series-icon]');

  card.classList.toggle('unlocked', unlocked);
  card.classList.toggle('locked', !unlocked);

  badge.className = `achievement-badge ${unlocked ? meta.colorClass : 'locked'}`;

  if (unlocked) {
    if (isImageSrc(ach.icon)) {
      badge.innerHTML = `<img src="${ach.icon}" alt="" onerror="this.replaceWith(document.createTextNode('🏆'))">`;
    } else {
      badge.textContent = ach.icon || '🏆';
    }
  } else {
    badge.textContent = '🔒';
  }

  card.querySelector('[data-name]').textContent = ach.name;
  card.querySelector('[data-desc]').textContent = `${ach.series} • ${ach.desc}`;
  card.querySelector('[data-state]').textContent = unlocked ? 'Unlocked' : 'Locked';

  const iconSrc = seriesIcons[ach.seriesKey] || '';
  seriesIconEl.src = iconSrc;
  seriesIconEl.alt = ach.series;
  seriesIconEl.style.display = iconSrc ? 'block' : 'none';
}

function renderAchievements() {
  const query = (achievementSearch?.value || '').trim().toLowerCase();
  const series = seriesFilter?.value || 'all';

  achievementDefs.forEach(ach => {
    if (!achievementCards.has(ach.id)) buildAchievementCard(ach);
    else renderAchievementCard(ach.id);

    const card = achievementCards.get(ach.id);
    const haystack = `${ach.name} ${ach.desc} ${ach.series} ${ach.rarity} ${ach.id}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesSeries = series === 'all' || ach.seriesKey === series;

    card.classList.toggle('hidden', !(matchesQuery && matchesSeries));
  });
}

achievementSearch?.addEventListener('input', renderAchievements);
seriesFilter?.addEventListener('change', renderAchievements);

loadAchievements();
renderAchievements();

if (unlockAchievement('welcome', true)) {
  const welcomeAch = achievementDefs.find(a => a.id === 'welcome');
  if (welcomeAch) showToast(welcomeAch);
}

// secret
const helpEl = document.getElementById('help');
let helpClicks = 0;

// Semi-secret achievement
helpEl?.addEventListener('click', () => {
  if (helpClicks >= 3) return;
  helpClicks++;

  if (helpClicks >= 3) {
    unlockAchievement('secret-secret2');
  }
});

const responses = [
  'I have heard about you',
  'You think you can fool me',
  'You are deeply mistaken',
  'Go away!',
  "You're not supposed to be in here...",
  "RubRub won't like this...",
  'zzzZZZZ...',
  "Don't touch that!",
  'Why you touch my stuff?',
  'You shall not pass!',
  "Don't push the button!",
  "You're gonna get me in trouble...",
  'Sneaky sneaky...',
  "It's my precious...",
  'Go collect some stars',
  'Maybe there are new levels?',
  'Just, stop bothering me',
  "I'm gonna stop talking",
  '...',
  '......',
  'GAH!',
  "You're hopeless...",
  'Really, still here?',
  'Fine, press the button'
];

const wrongResponses = [
  'WRONG',
  'Nope',
  'Swing and a miss!',
  'Door is still locked',
  'Try harder please',
  "Don't make me angry",
  'Failure',
  'May I suggest thinking?'
];

let responseIndex = 0;
const vaultText = document.getElementById('vaultText');
const input = document.getElementById('vaultInput');
const keymaster = document.getElementById('keymaster');
let keymasterCooldown = false;
input.value = '';

const vaultCodes = {
  'the challenge': {
    text: 'My level? You want to try it!?',
    id: 'gd'
  },
  octocube: {
    text: 'Ugh... Slippery',
    id: 'gd'
  },
  seven: {
    text: 'I should have been a doctor...',
    id: 'gd'
  },
  brainpower: {
    text: 'O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo!',
    id: 'gd'
  },
  thechickenisonfire: {
    text: 'Indeed it is... Or zZzZzZ..',
    id: 'gd'
  },
  gimmiethecolor: {
    text: 'How many colors do you need?',
    id: 'gd'
  },
  d4shg30me7ry: {
    text: 'Good times',
    id: 'gd'
  },
  thechickenisready: {
    text: 'You overcooked it again!',
    id: 'gd'
  },
  '7917281818277': {
    text: "You solved it? You're better than we expected... Here's a reward.",
    unlock: 'secret-secret3'
  },
  glubfub: {
    text: 'NOOOO!! THIEF! THIEF!',
    unlock: 'coin'
  }
};

const gdRequiredCodes = Object.keys(vaultCodes).filter(k => {
  const v = vaultCodes[k];
  return v.id === 'gd' || k === 'glubfub';
});

let gdProgress = new Set(JSON.parse(localStorage.getItem('gdProgress') || '[]'));
let usedVaultCodes = new Set();

function spawnCoin() {
  const coinSound = new Audio('./ImagesAudiosandVideos/coin-collect-geometry-dash.mp3');
  coinSound.play().catch(() => {});

  const coin = document.createElement('img');
  coin.src = './ImagesAudiosandVideos/Glubfub.gif';
  coin.alt = '';

  coin.style.position = 'fixed';
  coin.style.left = '50%';
  coin.style.top = '50%';
  coin.style.transform = 'translate(-50%, -50%)';
  coin.style.width = '100px';
  coin.style.zIndex = '9999';
  coin.style.pointerEvents = 'none';

  document.body.appendChild(coin);

  coin.animate(
    [
      { transform: 'translate(-50%, -50%)' },
      { transform: 'translate(-50%, -120%)' },
      { transform: 'translate(-50%, -50%)' }
    ],
    {
      duration: 300,
      easing: 'ease-out'
    }
  );

  setTimeout(() => {
    coin.animate(
      [
        { transform: 'translate(-50%, -50%)', opacity: 1 },
        { transform: 'translate(-50%, 200%)', opacity: 0 }
      ],
      {
        duration: 400,
        easing: 'ease-in',
        fill: 'forwards'
      }
    );
  }, 300);

  setTimeout(() => {
    coin.remove();
  }, 700);
}

function incrementGDProgress(code) {
  if (!gdRequiredCodes.includes(code)) return;

  gdProgress.add(code);
  localStorage.setItem('gdProgress', JSON.stringify([...gdProgress]));

  if (gdProgress.size === gdRequiredCodes.length) {
    unlockAchievement('gd');
  }
}

keymaster?.addEventListener('click', () => {
  if (keymasterCooldown) return;
  keymasterCooldown = true;

  try {
    const value = input.value.trim().toLowerCase();

    if (vaultCodes[value] && !usedVaultCodes.has(value)) {
      const code = vaultCodes[value];
      vaultText.textContent = code.text;
      usedVaultCodes.add(value);

      if (code.unlock) unlockAchievement(code.unlock);
      if (code.id === 'gd' || value === 'glubfub') incrementGDProgress(value);
      if (value === 'glubfub') spawnCoin();
    } else if (value === '') {
      vaultText.textContent = responses[responseIndex];
      responseIndex = (responseIndex + 1) % responses.length;
    } else {
      const rand = wrongResponses[Math.floor(Math.random() * wrongResponses.length)];
      vaultText.textContent = rand;
    }

    input.value = '';
  } finally {
    setTimeout(() => {
      keymasterCooldown = false;
    }, 400);
  }
});
