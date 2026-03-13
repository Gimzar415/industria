const pieces = [
  { id: 'base', name: 'Foundation Base', print: '180x180x12 mm PLA', description: 'Anchors the elevator start pad.' },
  { id: 'support', name: 'Truss Support', print: '90x90x20 mm PETG', description: 'Adds structural support to lower atmosphere.' },
  { id: 'cable', name: 'Ribbon Cable', print: '200x20x5 mm Nylon', description: 'Connects the elevator spine skyward.' },
  { id: 'cabin', name: 'Climber Cabin', print: '70x70x70 mm PLA', description: 'Carries explorers into orbit.' },
  { id: 'booster', name: 'Orbital Booster', print: '80x80x80 mm ABS', description: 'Stabilizes launch velocity.' },
  { id: 'solar', name: 'Solar Sail Crown', print: '140x40x3 mm PLA', description: 'Harvests light at the edge of space.' }
];

const stagePlan = [
  { level: 'Ground Launch', expected: 'base' },
  { level: 'Cloudline 1', expected: 'support' },
  { level: 'Cloudline 2', expected: 'support' },
  { level: 'Upper Air 1', expected: 'cable' },
  { level: 'Upper Air 2', expected: 'cable' },
  { level: 'Low Orbit Dock', expected: 'cabin' },
  { level: 'Mid Orbit Ring', expected: 'booster' },
  { level: 'Twilight Space Gate', expected: 'solar' }
];

const tray = document.getElementById('pieceTray');
const tower = document.getElementById('tower');
const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('bestScore');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const musicToggle = document.getElementById('musicToggle');

let score = 0;
let bestScore = Number(localStorage.getItem('spacePlaygroundBest') || 0);
let audioCtx;
let musicNodes = [];
let musicOn = false;

bestScoreEl.textContent = String(bestScore);

function pieceById(id) {
  return pieces.find((piece) => piece.id === id);
}

function renderTray() {
  tray.innerHTML = pieces
    .map(
      (piece) => `
      <article class="piece" draggable="true" data-piece-id="${piece.id}">
        <h3>${piece.name}</h3>
        <p>${piece.print}</p>
      </article>
    `
    )
    .join('');

  tray.querySelectorAll('.piece').forEach((el) => {
    el.addEventListener('dragstart', (event) => {
      event.dataTransfer?.setData('text/plain', el.dataset.pieceId || '');
    });
  });
}

function renderTower() {
  tower.innerHTML = stagePlan
    .map(
      (stage, index) => `
      <div class="slot" data-slot-index="${index}">
        <span class="slot-label">${stage.level}</span>
        <span class="badge">Needs: ${pieceById(stage.expected).name}</span>
      </div>
    `
    )
    .join('');

  tower.querySelectorAll('.slot').forEach((slot) => {
    slot.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    slot.addEventListener('drop', (event) => {
      event.preventDefault();
      const pieceId = event.dataTransfer?.getData('text/plain');
      if (!pieceId) return;

      const slotIndex = Number(slot.dataset.slotIndex);
      fillSlot(slot, slotIndex, pieceId);
    });
  });
}

function fillSlot(slot, slotIndex, pieceId) {
  if (slot.dataset.locked === 'true') {
    statusEl.textContent = 'That stage is already filled. Try another stage or reset.';
    return;
  }

  const chosenPiece = pieceById(pieceId);
  const expectedPiece = pieceById(stagePlan[slotIndex].expected);
  if (!chosenPiece || !expectedPiece) return;

  const isCorrect = chosenPiece.id === expectedPiece.id;
  score += 10;
  if (isCorrect) {
    score += 25;
    slot.classList.add('correct');
    slot.classList.remove('incorrect');
    statusEl.textContent = `Great! ${chosenPiece.name} is perfect for ${stagePlan[slotIndex].level}.`;
  } else {
    score -= 10;
    slot.classList.add('incorrect');
    slot.classList.remove('correct');
    statusEl.textContent = `Oops! ${stagePlan[slotIndex].level} really wanted ${expectedPiece.name}.`;
  }

  slot.classList.add('filled');
  slot.dataset.locked = 'true';
  slot.innerHTML = `
    <span class="slot-label">${stagePlan[slotIndex].level}</span>
    <span class="badge">Placed: ${chosenPiece.name}</span>
  `;

  updateScore();
  checkWin();
}

function updateScore() {
  scoreEl.textContent = String(score);
  if (score > bestScore) {
    bestScore = score;
    bestScoreEl.textContent = String(bestScore);
    localStorage.setItem('spacePlaygroundBest', String(bestScore));
  }
}

function checkWin() {
  const slots = [...tower.querySelectorAll('.slot')];
  const allFilled = slots.every((slot) => slot.dataset.locked === 'true');
  if (!allFilled) return;

  const allCorrect = slots.every((slot) => slot.classList.contains('correct'));
  if (allCorrect) {
    score += 50;
    updateScore();
    statusEl.textContent = `🚀 Elevator complete! Atticus reached twilight space with ${score} points.`;
  } else {
    statusEl.textContent = `Tower complete with some mismatches. Final score: ${score}. Try again for a flawless launch!`;
  }
}

function resetGame() {
  score = 0;
  scoreEl.textContent = '0';
  statusEl.textContent = 'Ready to build';
  renderTower();
}

function startMusic() {
  audioCtx = audioCtx || new AudioContext();
  const master = audioCtx.createGain();
  master.gain.value = 0.045;
  master.connect(audioCtx.destination);

  const notes = [110, 146.83, 196, 220];
  musicNodes = notes.map((frequency, index) => {
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = frequency;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.02;

    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.08 + index * 0.03;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 14;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(master);

    osc.start();
    lfo.start();

    return { osc, lfo, gain };
  });

  musicOn = true;
  musicToggle.textContent = '🔇 Stop Deep Space Music';
}

function stopMusic() {
  musicNodes.forEach(({ osc, lfo }) => {
    osc.stop();
    lfo.stop();
  });
  musicNodes = [];
  musicOn = false;
  musicToggle.textContent = '🔊 Start Deep Space Music';
}

musicToggle.addEventListener('click', async () => {
  if (!musicOn) {
    startMusic();
    if (audioCtx?.state === 'suspended') {
      await audioCtx.resume();
    }
  } else {
    stopMusic();
  }
});

resetBtn.addEventListener('click', resetGame);

renderTray();
renderTower();
