import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const DIFFICULTIES = [
  { key: 'easy',   label: 'Easy',   timer: '25s', hint: 'Classic riddles' },
  { key: 'medium', label: 'Medium', timer: '20s', hint: 'Lateral thinking' },
  { key: 'hard',   label: 'Hard',   timer: '15s', hint: 'Mind-benders'     },
];

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed) {
      navigate(`/game/${encodeURIComponent(trimmed)}/${difficulty}`);
    }
  };

  return (
    <div className="home">
      <div className="home__glow" />

      <div className="home__content">
        <div className="home__brand">
          <h1 className="home__title">ENIGMA</h1>
          <p className="home__tagline">Test your mind &middot; Beat the clock</p>
        </div>

        <div className="home__form">
          <input
            className="home__input"
            type="text"
            placeholder="Enter your name"
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          />

          <div className="home__difficulty">
            <p className="home__difficulty-label">Difficulty</p>
            <div className="home__difficulty-btns">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.key}
                  className={`home__diff-btn${difficulty === d.key ? ' home__diff-btn--active' : ''}`}
                  onClick={() => setDifficulty(d.key)}
                >
                  <span className="home__diff-label">{d.label}</span>
                  <span className="home__diff-timer">{d.timer}</span>
                  <span className="home__diff-hint">{d.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="home__start-btn"
            onClick={handleStart}
            disabled={!name.trim()}
          >
            Start Game
          </button>
        </div>

        <button
          className="home__leaderboard-link"
          onClick={() => navigate('/leaderboard')}
        >
          &#x1F3C6; View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Home;
