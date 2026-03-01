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
    headline: 'The Board Before the Game',
    bullets: [
      'Every business is a system of moving parts',
      'Chess reveals structure, constraint, and leverage',
    ],
    notes: 'I want to show you how I see the company right now — structurally.\nNot departmentally. Not emotionally. Structurally.\nThis is the board.',
    board: B0,
  },
  {
    headline: 'The King: Vision & Capital Allocation',
    bullets: [
      'Most important piece on the board',
      'Most constrained — one square at a time',
    ],
    notes: 'Every system has a center of gravity.\nIn our case, that\'s you.\nVision. Capital allocation. Risk tolerance. Boundary pushing.\nThe company organizes around that.\nThe king must be protected — not from risk — but from chaos.',
    board: B2,
  },
  {
    headline: 'The Departments: Capable, But Constrained',
    bullets: [
      'Marketing, Customer Service, Product, Tech, Fulfillment',
      'Each moves well — in its lane',
    ],
    notes: 'These are the departments.\nMarketing. Customer service. Product. Tech. Fulfillment.\nThey create forward motion. They execute. They carry output.\nThey\'re capable — but their mobility is limited, especially when work is repetitive, fragmented, or context-heavy.',
    board: B3,
  },
  {
    headline: 'Financial Visibility: Diagonal Sight',
    bullets: [
      'The Bishop sees patterns others miss',
      'Diagonal reach = cross-functional financial insight',
    ],
    notes: 'This is financial visibility.\nCAC. Contribution margin. EBITDA. Spend velocity.\nThis gives us diagonal sight across the board.\nWithout it, we guess.\nWith it, we compound.',
    board: B4,
  },
  {
    headline: 'Structure: Removing Friction from Movement',
    bullets: [
      'The Rook moves in straight lines — fast, far, unobstructed',
      'Systems and process are the open files',
    ],
    notes: 'This is where I operate best.\nLong-range structure. Open files. System stabilization.\nNot flashy. Not reactive.\nI create inevitability.',
    board: B5,
  },
  {
    headline: 'Legacy Behaviors: The L-Shaped Move',
    bullets: [
      'Knights jump — they don\'t follow straight lines',
      'Useful, but unpredictable in a structured system',
    ],
    notes: 'These are legacy behaviors.\nFragmented systems. Manual work. Cultural resistance. Context switching.\nNot bad — just nonlinear.\nIf we don\'t design around them, they create unpredictability.',
    board: B6,
  },
  {
    headline: 'What\'s Missing?',
    bullets: [
      'Every piece is accounted for — except one',
      'No piece has unrestricted cross-board movement',
    ],
    notes: 'Now look at the board.\nSomething is missing.\nWe don\'t have cross-board mobility.\nWe don\'t have time compression.\nWe don\'t have scalable unblocking.',
    board: B6,
  },
  {
    headline: 'The Cost of No Queen',
    bullets: [
      'Every other piece compensates for the missing range',
      'The whole system works harder to cover the gap',
    ],
    notes: 'There\'s no queen.\nWhen there\'s no queen, two things happen:\nThe rook stretches too far.\nOr the king overextends.\nThat\'s where bottlenecks form.\nThat\'s where cost creeps in.\nThat\'s where clarity degrades.',
    board: B6,
  },
  {
    headline: 'The Queen Enters: AI as Cross-Functional Leverage',
    bullets: [
      'Moves any direction, any distance, in a single turn',
      'Amplifies every piece it works beside',
    ],
    notes: 'AI is the queen.\nHigh mobility. Cross-functional. 24/7.\nBut we use AI as leverage without creating dependency.\nWe design for continuity — not fragility.',
    board: B9,
  },
  {
    headline: 'A Pawn Promotes: Fulfillment Gets AI',
    bullets: [
      'Fulfillment pawn reaches the back rank',
      'Transforms into a Queen — same team, new mobility',
    ],
    notes: 'Pawns promote.\nWhen departments learn to use AI well, they don\'t move one square at a time.\nThey generate queen-level leverage inside their own function.\nThat\'s where speed comes from.\nThat\'s where margin comes from.\nThat\'s where category separation begins.',
    board: B10,
  },
  {
    headline: 'The Sprint: Focused, Measured, Not Experimental',
    bullets: [
      '60 days. Three departments. Clear deliverables.',
      'This is not a pilot. It\'s a lever.',
    ],
    notes: 'The 60-day sprint isn\'t about installing tools.\nIt\'s about installing queens — responsibly.\nWe build capability.\nWe build repeatable workflows.\nWe build fallback paths.\nThe system runs clean even if tools change or fail.',
    board: B10,
  },
  {
    headline: 'Three Highest-Leverage Files',
    bullets: [
      'Marketing: content velocity and targeting precision',
      'Customer Service: response time and resolution rate',
    ],
    notes: 'We focus on the highest-leverage files first.\nMarketing. Customer service. Tech/product throughput.\nWe enable early adopters deeply.\nWe audit tech spend.\nWe capture and systematize critical workflows.\nThen we propagate what works.',
    board: B10,
  },
  {
    headline: 'What Day 60 Looks Like',
    bullets: [
      'Real data: where to double down, where to address',
      'A decision-ready board — not a hypothesis',
    ],
    notes: 'By Day 60, we\'ll have measurable proof.\nReal adoption.\nReal shipped micro-systems.\nClear visibility into friction.\nWe\'ll know where leverage compounds —\nand where resistance lives.\nAnd we\'ll tie it directly to margin and velocity.',
    board: B10,
  },
  {
    headline: 'Structural Shift: Velocity + OPEX Compression',
    bullets: [
      'Three departments now move with queen-range',
      'Velocity and cost compress simultaneously',
    ],
    notes: 'If we do this right, the board changes.\nVelocity increases.\nOPEX compresses.\nBottlenecks reduce.\nDecisions get clearer.\nWe don\'t just move faster.\nWe build a system that keeps moving.',
    board: B14,
  },
  {
    headline: 'This Is a Permanent Board Change',
    bullets: [
      'The pieces don\'t go back to pawns',
      'The question is: which file are you on in 60 days?',
    ],
    notes: 'This isn\'t a title conversation.\nIt\'s a structural leverage conversation.\nThe sprint is a contained experiment to see if we can manufacture queens — with continuity built in.\nIf we can,\nthe board changes permanently.',
    board: B14,
  },
  {
    headline: 'The Full Board: Eight Departments in Formation',
    bullets: [
      'Back rank anchored — King, Rooks, Bishops, Knights in place',
      'Eight departments advance together — one gap remains',
    ],
    notes: 'This is the full organizational board.\nEvery structural piece is placed. Every department is in motion.\nThe back rank is anchored — King at E8, Rooks, Bishops, Knights locked in.\nEight departments advance in formation along rank 7.\nBut look at D8. It\'s empty.\nThe most powerful piece has yet to arrive.',
    board: BSETUP,
  },
  {
    headline: 'The Queen Enters: D8',
    bullets: [
      'AI takes its place on the back rank',
      'Every piece now has full leverage behind it',
    ],
    notes: 'The queen enters at D8.\nAlongside the King. Maximum reach in every direction.\nThis is what a fully activated board looks like.\nAI behind the formation — not replacing the pieces,\nbut multiplying what every piece can do.\nThe system is complete.',
    board: BSETUPQ,
  },
  {
    headline: 'The Future: Every Department a Queen',
    bullets: [
      'Eight departments — fully AI-enabled',
      'The whole board moves with queen-range leverage',
    ],
    notes: 'This is where we\'re headed.\nNot one queen. Not three.\nEvery department AI-enabled — moving with full range.\nMarketing. Customer Service. Product. Tech. Fulfillment. Sales. HR. Operations.\nAll eight.\nThis is the board we\'re building toward.',
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
