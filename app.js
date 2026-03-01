/* ============================================================
   Chess AI Sprint — Slide Deck Logic
   ============================================================ */

// ── Presenter mode ───────────────────────────────────────────
const params = new URLSearchParams(location.search);
if (params.get('presenter') === '1') {
  document.body.classList.add('presenter');
}

// ── Piece definitions ────────────────────────────────────────
// Cburnett SVG piece set — CC BY-SA 4.0, Colin M.L. Burnett / lichess-org
const PIECES = {
  KING:   { svg: 'wK.svg', tooltip: 'King = CEO / Vision & Capital Allocation' },
  QUEEN:  { svg: 'wQ.svg', tooltip: 'Queen = AI / Cross-functional Leverage' },
  ROOK:   { svg: 'wR.svg', tooltip: 'Rook = Structure / System Stabilization' },
  BISHOP: { svg: 'wB.svg', tooltip: 'Bishop = Financial Visibility / Pattern Recognition' },
  KNIGHT: { svg: 'wN.svg', tooltip: 'Knight = Legacy Behaviors / Cultural Resistance' },
  PAWN_M: { svg: 'wP.svg', tooltip: 'Pawn = Marketing' },
  PAWN_C: { svg: 'wP.svg', tooltip: 'Pawn = Customer Service' },
  PAWN_P: { svg: 'wP.svg', tooltip: 'Pawn = Product' },
  PAWN_T: { svg: 'wP.svg', tooltip: 'Pawn = Tech' },
  PAWN_F: { svg: 'wP.svg', tooltip: 'Pawn = Fulfillment (promoting)' },
  QUEEN2: { svg: 'wQ.svg', tooltip: 'Queen = AI inside Fulfillment (promoted)' },
  QUEEN3: { svg: 'wQ.svg', tooltip: 'Queen = AI inside Customer Service (promoted)' },
  QUEEN4: { svg: 'wQ.svg', tooltip: 'Queen = AI inside Tech (promoted)' },
  PAWN_SA: { svg: 'wP.svg', tooltip: 'Pawn = Sales' },
  PAWN_HR: { svg: 'wP.svg', tooltip: 'Pawn = HR / People' },
  PAWN_OP: { svg: 'wP.svg', tooltip: 'Pawn = Operations' },
  QUEEN_FUT: { svg: 'wQ.svg', tooltip: 'Queen = AI-enabled department (future state)' },
};

// ── Shared board snapshots ───────────────────────────────────
// Built cumulatively to keep slide definitions concise
const B0 = {};

const B2 = { ...B0, e2: 'KING' };

const B3 = {
  ...B2,
  a5: 'PAWN_M', b5: 'PAWN_C', c5: 'PAWN_P', d5: 'PAWN_T', f5: 'PAWN_F',
};

const B4 = { ...B3, c3: 'BISHOP' };

const B5 = { ...B4, h1: 'ROOK' };

const B6 = { ...B5, b3: 'KNIGHT', g5: 'KNIGHT' };

const B9 = { ...B6, e6: 'QUEEN' };

const B10 = (({ f5, ...rest }) => ({ ...rest, f8: 'QUEEN2' }))(B9);

const B14 = (({ b5, d5, ...rest }) => ({ ...rest, b8: 'QUEEN3', d8: 'QUEEN4' }))(B10);

// Back rank setup: King e8 (center), Rooks a8+h8, Bishops c8+f8, Knights b8+g8, 8 pawns on rank 7
const BSETUP = {
  e8: 'KING',
  a8: 'ROOK',   h8: 'ROOK',
  c8: 'BISHOP', f8: 'BISHOP',
  b8: 'KNIGHT', g8: 'KNIGHT',
  a7: 'PAWN_M', b7: 'PAWN_C', c7: 'PAWN_P', d7: 'PAWN_T',
  e7: 'PAWN_F', f7: 'PAWN_SA', g7: 'PAWN_HR', h7: 'PAWN_OP',
};

// Same setup with Queen entering at d8
const BSETUPQ = { ...BSETUP, d8: 'QUEEN' };

// Future state: all departments have become queens (rank 6)
const BSETUPFUTURE = {
  ...BSETUPQ,
  a6: 'QUEEN_FUT', b6: 'QUEEN_FUT', c6: 'QUEEN_FUT', d6: 'QUEEN_FUT',
  e6: 'QUEEN_FUT', f6: 'QUEEN_FUT', g6: 'QUEEN_FUT', h6: 'QUEEN_FUT',
};

// ── Slide data ───────────────────────────────────────────────
const SLIDES = [
  {
    headline: 'Every business is a system of moving parts.',
    bullets: [
      'Structure determines leverage.',
      'Leverage determines speed.',
    ],
    notes: 'We\'re going to look at our company structurally. Not by titles. Not by org chart. By how work moves. Chess is a useful metaphor because it shows how constraint, coordination, and leverage determine outcomes.',
    board: B0,
  },
  {
    headline: 'Vision anchors the system.',
    bullets: [
      'Strategy sets direction.',
      'Capital fuels movement.',
    ],
    notes: 'Every company has a center of gravity — vision and capital allocation. Strategy defines where we go. Resources determine how fast we move. Everything else aligns around that clarity.',
    board: B2,
  },
  {
    headline: 'Every department advances the board.',
    bullets: [
      'Marketing, Customer Service, Product, Tech, Fulfillment, Sales, HR, Operations.',
      'Each contributes forward motion.',
    ],
    notes: 'Each department moves the company forward in its own lane. Execution happens here. Progress happens here. The strength of the board depends on coordinated advancement.',
    board: B3,
  },
  {
    headline: 'Clarity compounds.',
    bullets: [
      'CAC, contribution margin, EBITDA.',
      'Cross-functional visibility drives better decisions.',
    ],
    notes: 'When we see clearly — across spend, revenue, and margin — we make stronger decisions. Financial clarity lets us move with intention instead of guesswork.',
    board: B4,
  },
  {
    headline: 'Systems create speed.',
    bullets: [
      'Clear process.',
      'Open lanes.',
      'Reduced context switching.',
    ],
    notes: 'When systems are clean, movement accelerates. Structure doesn\'t slow us down — it removes friction so people can focus on meaningful work.',
    board: B5,
  },
  {
    headline: 'Not all movement is efficient.',
    bullets: [
      'Manual repetition.',
      'Fragmented tools.',
      'Context switching.',
    ],
    notes: 'Every growing company accumulates friction — repetitive tasks, disconnected systems, manual workflows. None of it is malicious. But it limits range and slows compounding.',
    board: B6,
  },
  {
    headline: 'We can move — but not yet with full range.',
    bullets: [
      'Limited cross-functional acceleration.',
      'Time compression is constrained.',
    ],
    notes: 'Even with strong departments and systems, something is missing. We don\'t yet have unrestricted leverage across the board. Movement still requires too many steps.',
    board: B6,
  },
  {
    headline: 'The system works harder than it should.',
    bullets: [
      'Manual effort increases.',
      'Bottlenecks form.',
    ],
    notes: 'Without cross-board leverage, teams compensate. Work expands. Context switching increases. Cost creeps in. Speed degrades.',
    board: B6,
  },
  {
    headline: 'AI expands range.',
    bullets: [
      'Cross-functional.',
      'Time-compressing.',
      'Always available.',
    ],
    notes: 'AI functions like the queen on a chessboard — high mobility, high leverage. It doesn\'t replace departments. It multiplies them. And we use AI as leverage without creating fragility. We design continuity into the system.',
    board: B9,
  },
  {
    headline: 'Every department can promote.',
    bullets: [
      'Skill + AI = expanded mobility.',
      'Leverage lives inside teams.',
    ],
    notes: 'In chess, pawns promote. In business, departments expand their range when they combine expertise with AI capability. This isn\'t centralized power — it\'s distributed acceleration.',
    board: B10,
  },
  {
    headline: '60 days of intentional leverage.',
    bullets: [
      'Measured adoption.',
      'Real workflows.',
      'Real outputs.',
    ],
    notes: 'The 60-day sprint is about building capability responsibly. We document repetitive work. We install AI where it makes sense. We create fallback paths. This is not experimentation — it\'s structured acceleration.',
    board: B10,
  },
  {
    headline: 'We start where friction is visible.',
    bullets: [
      'Repetitive workflows.',
      'Manual reporting.',
      'Slow iteration loops.',
    ],
    notes: 'We\'ll capture real workflows across departments. Record tedious tasks. Identify where AI compresses time. Identify where automation or delegation makes sense. Then propagate what works.',
    board: B10,
  },
  {
    headline: 'Proof, not theory.',
    bullets: [
      'Measured usage.',
      'Shipped improvements.',
      'Clear friction map.',
    ],
    notes: 'By Day 60, we\'ll see real adoption. Real time saved. Real system improvements. We\'ll know where to double down and where to redesign.',
    board: B10,
  },
  {
    headline: 'Velocity and margin improve together.',
    bullets: [
      'Faster iteration.',
      'Reduced OPEX.',
      'Clearer decision flow.',
    ],
    notes: 'When leverage increases, both speed and efficiency improve. We don\'t trade one for the other. We gain both.',
    board: B14,
  },
  {
    headline: 'The board doesn\'t revert.',
    bullets: [
      'Capability compounds.',
      'Leverage becomes cultural.',
    ],
    notes: 'This isn\'t a temporary experiment. Once departments expand their range, that capability remains. The system improves permanently.',
    board: B14,
  },
  {
    headline: 'Coordination beats individual speed.',
    bullets: [
      'Eight departments in formation.',
      'Shared leverage.',
    ],
    notes: 'When every department advances together — supported by clear structure and AI leverage — the board becomes coordinated, not chaotic.',
    board: BSETUP,
  },
  {
    headline: 'AI supports every piece.',
    bullets: [
      'Behind the formation.',
      'Multiplying movement.',
      'Designed with fallback.',
    ],
    notes: 'AI sits behind the system, multiplying each department\'s effectiveness. It\'s integrated — not bolted on. And it\'s built with continuity in mind.',
    board: BSETUPQ,
  },
  {
    headline: 'Full-range organization.',
    bullets: [
      'AI-enabled across all functions.',
      'Category-defining velocity.',
    ],
    notes: 'The goal isn\'t one team moving faster. It\'s every department operating with expanded range. That\'s how we separate from competitors. That\'s how we compound advantage.',
    board: BSETUPFUTURE,
  },
];

// ── State ────────────────────────────────────────────────────
let currentIndex = 0;
let previousBoard = {};

// ── Board utilities ──────────────────────────────────────────
function squareColor(col, row) {
  // col: 0–7 (a–h), row: 0–7 (8–1 visually, 1–8 logically)
  return (col + row) % 2 === 0 ? 'dark' : 'light';
}

function algebraicToIndices(sq) {
  // sq like "e2" → { col: 4, row: 6 } (row 0 = rank 8 at top)
  const col = sq.charCodeAt(0) - 97; // 'a'=0 … 'h'=7
  const rank = parseInt(sq[1], 10);   // 1–8
  const row = 8 - rank;               // rank 8 → row 0 (top)
  return { col, row };
}

function squareId(col, row) {
  return `sq-${col}-${row}`;
}

// ── Build board DOM ──────────────────────────────────────────
function buildBoard() {
  const board = document.getElementById('chessboard');
  board.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = document.createElement('div');
      sq.className = `square ${squareColor(col, row)}`;
      sq.id = squareId(col, row);
      board.appendChild(sq);
    }
  }
}

// ── Diff boards ──────────────────────────────────────────────
function diffBoards(prev, next) {
  const prevKeys = new Set(Object.keys(prev));
  const nextKeys = new Set(Object.keys(next));
  const added = [];
  const removed = [];

  for (const sq of nextKeys) {
    if (!prevKeys.has(sq) || prev[sq] !== next[sq]) {
      added.push(sq);
    }
  }
  for (const sq of prevKeys) {
    if (!nextKeys.has(sq)) {
      removed.push(sq);
    }
  }
  return { added, removed };
}

// ── Render pieces ────────────────────────────────────────────
function renderPieces(board) {
  const { added, removed } = diffBoards(previousBoard, board);

  // Remove pieces no longer present
  for (const sq of removed) {
    const { col, row } = algebraicToIndices(sq);
    const cell = document.getElementById(squareId(col, row));
    if (cell) cell.innerHTML = '';
  }

  // Add new or changed pieces
  for (const sq of added) {
    const pieceKey = board[sq];
    const piece = PIECES[pieceKey];
    if (!piece) continue;
    const { col, row } = algebraicToIndices(sq);
    const cell = document.getElementById(squareId(col, row));
    if (!cell) continue;
    cell.innerHTML = '';
    const el = document.createElement('span');
    el.className = 'piece entering';
    el.setAttribute('data-tooltip', piece.tooltip);
    const img = document.createElement('img');
    img.src = `pieces/${piece.svg}`;
    img.alt = pieceKey;
    img.className = 'piece-img';
    el.appendChild(img);
    // Remove entering class after animation completes
    el.addEventListener('animationend', () => el.classList.remove('entering'), { once: true });
    cell.appendChild(el);
  }

  previousBoard = { ...board };
}

// ── Render slide ─────────────────────────────────────────────
function renderSlide(index) {
  const slide = SLIDES[index];
  const content = document.getElementById('slide-content');

  // Fade out
  content.classList.add('fading');

  setTimeout(() => {
    // Update text
    document.getElementById('headline').textContent = slide.headline;

    const ul = document.getElementById('bullets');
    ul.innerHTML = '';
    for (const bullet of slide.bullets) {
      const li = document.createElement('li');
      li.textContent = bullet;
      ul.appendChild(li);
    }

    document.getElementById('notes-text').textContent = slide.notes;
    document.getElementById('progress').textContent = `${index + 1} / ${SLIDES.length}`;

    // Fade in
    content.classList.remove('fading');

    // Update board
    renderPieces(slide.board);
  }, 150);
}

// ── Navigation ───────────────────────────────────────────────
function next() {
  if (currentIndex < SLIDES.length - 1) {
    currentIndex++;
    renderSlide(currentIndex);
  }
}

function prev() {
  if (currentIndex > 0) {
    currentIndex--;
    renderSlide(currentIndex);
  }
}

function toggleNotes() {
  document.body.classList.toggle('notes-visible');
}

// ── Event listeners ──────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  } else if (e.key === 's' || e.key === 'S') {
    toggleNotes();
  }
});

document.getElementById('content-panel').addEventListener('click', () => {
  next();
});

// ── Init ─────────────────────────────────────────────────────
buildBoard();
renderSlide(0);
