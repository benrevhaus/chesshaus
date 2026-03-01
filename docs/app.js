/* ============================================================
   Chess AI Sprint — Slide Deck Logic
   ============================================================ */

// ── Presenter mode ───────────────────────────────────────────
const params = new URLSearchParams(location.search);
if (params.get('presenter') === '1') {
  document.body.classList.add('presenter');
}

// ── Piece definitions ────────────────────────────────────────
const PIECES = {
  KING:   { glyph: '♔', tooltip: 'King = CEO / Vision & Capital Allocation' },
  QUEEN:  { glyph: '♕', tooltip: 'Queen = AI / Cross-functional Leverage' },
  ROOK:   { glyph: '♖', tooltip: 'Rook = Structure / System Stabilization' },
  BISHOP: { glyph: '♗', tooltip: 'Bishop = Financial Visibility / Pattern Recognition' },
  KNIGHT: { glyph: '♘', tooltip: 'Knight = Legacy Behaviors / Cultural Resistance' },
  PAWN_M: { glyph: '♙', tooltip: 'Pawn = Marketing' },
  PAWN_C: { glyph: '♙', tooltip: 'Pawn = Customer Service' },
  PAWN_P: { glyph: '♙', tooltip: 'Pawn = Product' },
  PAWN_T: { glyph: '♙', tooltip: 'Pawn = Tech' },
  PAWN_F: { glyph: '♙', tooltip: 'Pawn = Fulfillment (promoting)' },
  QUEEN2: { glyph: '♕', tooltip: 'Queen = AI inside Fulfillment (promoted)' },
  QUEEN3: { glyph: '♕', tooltip: 'Queen = AI inside Customer Service (promoted)' },
  QUEEN4: { glyph: '♕', tooltip: 'Queen = AI inside Tech (promoted)' },
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

// ── Slide data ───────────────────────────────────────────────
const SLIDES = [
  {
    headline: 'The Board Before the Game',
    bullets: [
      'Every business is a system of moving parts',
      'Chess reveals structure, constraint, and leverage',
    ],
    notes: 'Start here. The board is empty — intentionally. We\'re not drawing an org chart. We\'re mapping a system. The power of chess as a metaphor is that every piece has a defined role, defined movement, and defined constraints. That\'s your company too. Give it a beat. Let the silence work.',
    board: B0,
  },
  {
    headline: 'The King: Vision & Capital Allocation',
    bullets: [
      'Most important piece on the board',
      'Most constrained — one square at a time',
    ],
    notes: 'The CEO is indispensable — and that\'s also the risk. The King can\'t be lost, so it\'s protected. But that protection costs mobility. Every dollar of capital allocation, every strategic decision, routes through this piece. The constraint isn\'t weakness — it\'s by design. The question is: are the other pieces giving it room to move?',
    board: B2,
  },
  {
    headline: 'The Departments: Capable, But Constrained',
    bullets: [
      'Marketing, Customer Service, Product, Tech, Fulfillment',
      'Each moves well — in its lane',
    ],
    notes: 'Pawns get a bad reputation. But in your business, these are real teams doing real work. The constraint isn\'t skill — it\'s mobility. A pawn moves forward, one square at a time. It can\'t reach back. It can\'t jump. It can\'t cross files. Your departments are the same: capable within their function, limited across it. Hover each piece to see which department it represents.',
    board: B3,
  },
  {
    headline: 'Financial Visibility: Diagonal Sight',
    bullets: [
      'The Bishop sees patterns others miss',
      'Diagonal reach = cross-functional financial insight',
    ],
    notes: 'The Bishop moves diagonally — it never travels the same file as the King or the pawns. That\'s your finance function: it doesn\'t operate in the same lanes, but it sees across them. Pattern recognition. Margin trends. Where cash is burning before the P&L catches up. This is the piece that gives the King strategic sight.',
    board: B4,
  },
  {
    headline: 'Structure: Removing Friction from Movement',
    bullets: [
      'The Rook moves in straight lines — fast, far, unobstructed',
      'Systems and process are the open files',
    ],
    notes: 'A Rook on an open file is one of the most powerful positions in chess. It\'s not the piece itself — it\'s the cleared path. Your operational systems are the same. Process, tooling, clear ownership: these don\'t make the Rook stronger, they clear the board so it can move. Structure isn\'t bureaucracy. It\'s friction removal.',
    board: B5,
  },
  {
    headline: 'Legacy Behaviors: The L-Shaped Move',
    bullets: [
      'Knights jump — they don\'t follow straight lines',
      'Useful, but unpredictable in a structured system',
    ],
    notes: 'Knights are the most unusual pieces on the board. They jump over other pieces. They move in an L — two squares one direction, one square perpendicular. In your organization, these are legacy behaviors: workarounds, tribal knowledge, processes that predate the current structure. They\'re not bad. They\'re often clever. But they move differently from everything else, and that creates coordination friction.',
    board: B6,
  },
  {
    headline: 'What\'s Missing?',
    bullets: [
      'Every piece is accounted for — except one',
      'No piece has unrestricted cross-board movement',
    ],
    notes: 'Pause here. Let the board breathe. Count the pieces. Ask the room: what\'s missing? Don\'t answer it yet. The absence is the point. Every piece on this board moves within constraints. Nothing crosses the board in a single turn. Nothing operates across every file and rank simultaneously. Name that gap before you fill it.',
    board: B6,
  },
  {
    headline: 'The Cost of No Queen',
    bullets: [
      'Every other piece compensates for the missing range',
      'The whole system works harder to cover the gap',
    ],
    notes: 'This is the business right now. Without a piece that moves everywhere, all the other pieces have to work overtime to compensate. Marketing tries to cover CS gaps. Product tries to cover tech debt. The King makes operational decisions it shouldn\'t need to touch. Everyone is doing their job plus part of someone else\'s. That\'s not a performance problem — it\'s a structural one.',
    board: B6,
  },
  {
    headline: 'The Queen Enters: AI as Cross-Functional Leverage',
    bullets: [
      'Moves any direction, any distance, in a single turn',
      'Amplifies every piece it works beside',
    ],
    notes: 'The Queen is the most powerful piece in chess — not because it\'s special on its own, but because of what it enables. It protects the King, supports the Rooks, opens lines for the Bishops. AI is the same. It doesn\'t replace your departments. It amplifies them. It handles the cross-board moves no single function can make alone. 24 hours a day.',
    board: B9,
  },
  {
    headline: 'A Pawn Promotes: Fulfillment Gets AI',
    bullets: [
      'Fulfillment pawn reaches the back rank',
      'Transforms into a Queen — same team, new mobility',
    ],
    notes: 'When a pawn reaches the opposite back rank, it promotes — usually to a Queen. That\'s not a replacement. It\'s an upgrade. The same Fulfillment function, now with AI embedded, suddenly has cross-board range. It can see across the order pipeline, flag anomalies, surface patterns. The team didn\'t change. Its mobility did.',
    board: B10,
  },
  {
    headline: 'The Sprint: Focused, Measured, Not Experimental',
    bullets: [
      '60 days. Three departments. Clear deliverables.',
      'This is not a pilot. It\'s a lever.',
    ],
    notes: 'Pilots are open-ended. This isn\'t. A sprint has a start, a finish, and defined outputs. 60 days. Three targeted functions. Measurable baselines before we start. We\'re not asking: does AI work? We\'re proving: what specifically does it unlock here. The difference matters for your board, your team, and your next capital decision.',
    board: B10,
  },
  {
    headline: 'Three Highest-Leverage Files',
    bullets: [
      'Marketing: content velocity and targeting precision',
      'Customer Service: response time and resolution rate',
    ],
    notes: 'We selected these three because they share a common profile: high volume, high repetition, measurable output. Marketing generates content at a pace humans can\'t sustain alone. CS handles inquiry volume that scales non-linearly with growth. Tech carries the weight of documentation, code review, and deployment friction. Each one has a baseline we can measure today and a target we can hit in 60 days.',
    board: B10,
  },
  {
    headline: 'What Day 60 Looks Like',
    bullets: [
      'Real data: where to double down, where to address',
      'A decision-ready board — not a hypothesis',
    ],
    notes: 'At day 60, you have something no pilot gives you: operational data from your actual company. Not a benchmark. Not an industry average. Your Marketing team\'s content output. Your CS team\'s resolution curve. Your Tech team\'s deployment cadence. You\'ll know exactly where AI compounded and where it surfaced underlying structural issues. That\'s the decision you make with confidence — not faith.',
    board: B10,
  },
  {
    headline: 'Structural Shift: Velocity + OPEX Compression',
    bullets: [
      'Three departments now move with queen-range',
      'Velocity and cost compress simultaneously',
    ],
    notes: 'Two queens promoting at once. CS and Tech get the same mobility upgrade Fulfillment did. This is the compounding effect. Velocity increases while OPEX compresses — that\'s not a tradeoff, it\'s a structural shift. The board looks different now. Not because you added headcount. Because you changed how far each piece can move in a single turn.',
    board: B14,
  },
  {
    headline: 'This Is a Permanent Board Change',
    bullets: [
      'The pieces don\'t go back to pawns',
      'The question is: which file are you on in 60 days?',
    ],
    notes: 'In chess, a promoted queen stays a queen. The pawn doesn\'t revert. This is the same. AI-embedded functions don\'t go back to operating manually. The question you\'re deciding today isn\'t "should we try AI." It\'s "where do we want to be when the board is set?" The sprint gives you that position. [Pause. Let it land.]',
    board: B14,
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
    el.textContent = piece.glyph;
    el.setAttribute('data-tooltip', piece.tooltip);
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
