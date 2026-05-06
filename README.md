# ENIGMA

A riddle game built with React. Answer riddles against the clock, earn points based on speed and accuracy, and climb the leaderboard.

**[Live Demo](#)** &nbsp;·&nbsp; **[Report Bug](https://github.com/developershanker/enigma/issues)**

---

## Screenshots

> Home Page · Game Page · Results Page · Leaderboard

---

## Features

- **3 difficulty levels** — Easy, Medium, and Hard riddle pools (15 riddles total)
- **20-second countdown timer** — SVG circular timer that pulses red in the final 7 seconds
- **Live scoring** — 10 base points + seconds remaining for each correct answer (max 150 pts)
- **Instant feedback** — options flash green or shake red immediately after selection
- **Results breakdown** — per-question summary showing your answer vs the correct one
- **Persistent leaderboard** — top 10 scores saved to localStorage across sessions

---

## Tech Stack

- **React 18** with React Router v6
- **SCSS** with BEM naming
- **Google Fonts** — Cinzel (headers) + Inter (body)
- **localStorage** for score persistence
- No external UI libraries

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/developershanker/enigma.git
cd enigma/enigma

# Install dependencies
npm install

# Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Play

1. Enter your name on the home screen
2. Choose a difficulty — **Easy**, **Medium**, or **Hard**
3. Answer 5 riddles before the 20-second timer runs out each round
4. Your score = **10 pts** (base) + **seconds remaining** per correct answer
5. View your breakdown on the results screen and check the leaderboard

---

## Project Structure

```
src/
├── components/
│   ├── Timer.js          # SVG circular countdown
│   ├── OptionCard.js     # Answer button (5 visual states)
│   └── ProgressBar.js    # Riddle progress dots
├── Pages/
│   ├── Home.js           # Name input + difficulty selection
│   ├── Game.js           # Core game loop
│   ├── Results.js        # Score summary + breakdown
│   └── Leaderboard.js    # Top-10 scores
└── utils/
    ├── data.json         # 15 riddles across 3 difficulties
    └── storage.js        # localStorage helpers
```

---

## Scoring

| Outcome | Points |
|---------|--------|
| Correct answer | 10 + seconds remaining |
| Wrong answer | 0 |
| Timeout | 0 |
| **Max per riddle** | **30** |
| **Max per game** | **150** |

---

## License

MIT
