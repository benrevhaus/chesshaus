# Chess AI Sprint — 60-Day Leverage

An executive slide deck built as a single HTML page with no build step.
The chessboard metaphor maps AI leverage across business functions across 15 slides.

---

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select your branch and folder: `/ (root)`
4. Save. Your deck will be live at `https://<your-org>.github.io/<repo>/`

---

## Local Preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `S` | Toggle speaker notes |

## Presenter Mode

Add `?presenter=1` to the URL to enable presenter mode.
This shows speaker notes in a dedicated third column alongside the board and slide content.

```
http://localhost:8000/?presenter=1
```

---

## Piece Tooltips

Hover any chess piece to see which business function it represents.

---

## File Structure

```
/
├── README.md
├── index.html   — HTML shell
├── styles.css   — Design system, layout, board, animations
└── app.js       — Piece data, slide data, render logic, keyboard events
```
