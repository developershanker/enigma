import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const DIFFICULTIES = ['easy', 'medium', 'hard'];

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
                  key={d}
                  className={`home__diff-btn${difficulty === d ? ' home__diff-btn--active' : ''}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
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
