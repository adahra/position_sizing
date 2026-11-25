# Repository Guidelines

## Project Overview

`position_sizing` is a browser-based trading position-sizing calculator (static HTML/CSS/JS, UI text in Indonesian). It computes maximum position size, stop-loss, and take-profit from capital, risk limit, entry price, ATR, and risk-reward ratio. No backend, no dependencies, no build step.

Key formulas (in `script.js`):

- Max risk = capital × risk %
- SL distance = `ceil(ATR × 2)`
- SL price = entry − SL distance
- TP distance = SL distance × risk-reward
- TP price = entry + TP distance
- Max lot = `floor(max risk ÷ (SL distance × 100))`, 1 lot = 100 shares
- Actual risk = SL distance × actual shares

Behavior notes (intentional, not bugs): `Math.ceil` rounds SL distance up; `Math.floor` drops the remainder in max lot.

## Architecture & Data Flow

Single-file vanilla JavaScript. `index.html` is the entry point; it loads `script.js` (line 72) and `styles.css`. All logic lives in one function `hitungTrading()` in `script.js` — no modules, no imports, no framework.

Data flow: form inputs → parse + validate (`Number.isFinite`, `> 0`) → compute → single `hasilDiv.innerHTML` template-literal render. Submit handler calls `preventDefault()` then `hitungTrading()`. Reset handler clears the result area after a 0ms timeout. Result section has `aria-live="polite"`.

Key DOM IDs: `tradingForm`, `hasil`, `modal`, `risiko`, `hargaBeli`, `atr`, `jumlahSaham`, `riskReward`.

## Key Directories

Project root only. Files:

- `index.html` — page structure and input form
- `script.js` — validation, calculation, rendering, event listeners
- `styles.css` — dark-theme styling, 2-column grid, responsive layout
- `README.md` — documentation (Indonesian)
- `.git/` — version control

No `src/`, `tests/`, `dist/`, or config directories exist.

## Development Commands

No `package.json`, so no `npm`/`yarn`/`pnpm` scripts. No build, lint, or test commands.

- Run: open `index.html` directly in a browser, or `python3 -m http.server 8000` then open `http://localhost:8000/`
- Build/test/lint: none

## Code Conventions & Common Patterns

- **Naming:** `camelCase` for variables/functions (`hitungTrading`, `formatRupiah`, `nilaiRisikoMaksimal`, `jarakSL`, `titikSL`, `risikoAktual`, `lotMaksimum`, `melebihiBatas`).
- **Currency:** `formatRupiah()` uses `value.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })`, prefixed with literal `"Rp"` in HTML. Share counts formatted inline via `.toLocaleString('id-ID')`. Percent via `(risiko * 100).toFixed(0)`; price points via `.toFixed(0)`.
- **Validation:** at the trust boundary (form input). `modal`, `hargaBeli`, `atr` must be finite and `> 0`; `jumlahSaham` optional but must be an integer `> 0` if given. Failure renders a `.error` message via `innerHTML` and returns.
- **Styling:** CSS custom properties (`--background`, `--primary`, etc.), dark mode, 2-column form grid, `@media (max-width: 560px)` responsive block. `Inter` font falls back to system fonts.
- **Events:** `form.addEventListener('submit', …)` and `('reset', …)`; no inline handlers in HTML.
- **Rendering:** one `innerHTML` template literal per calculation; `.error` / `.warning` / `.success` classes for message styling.

## Important Files

| File | Role |
|---|---|
| `index.html` | Entry point; form structure; result section; loads `script.js` at line 72 |
| `script.js` | Sole logic source: validation, formulas, render, event listeners |
| `styles.css` | All styling: dark theme, responsive layout |
| `README.md` | Project documentation (Indonesian) |

## Runtime / Tooling Preferences

- Runtime: any modern browser. No Node.js, npm, or bundler required.
- Package manager: none (no `package.json`, no dependencies, no `node_modules`).
- Tooling constraints: vanilla HTML/CSS/JS only; no external scripts or CDNs.

## Testing & QA

- No test framework, no test files, no CI/CD workflow, no coverage expectations.
- Verify manually: open `index.html`, submit the form, check calculation output and error states for invalid input (zero/negative capital, entry price, ATR; non-integer shares).
