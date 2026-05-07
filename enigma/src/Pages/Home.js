import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Home.scss';

const DIFFICULTY_KEYS = [
  { key: 'easy',   timer: '25s' },
  { key: 'medium', timer: '20s' },
  { key: 'hard',   timer: '15s' },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
          <p className="home__tagline">{t('tagline')}</p>
        </div>

        <div className="home__form">
          <input
            className="home__input"
            type="text"
            placeholder={t('enterName')}
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          />

          <div className="home__difficulty">
            <p className="home__difficulty-label">{t('difficulty')}</p>
            <div className="home__difficulty-btns">
              {DIFFICULTY_KEYS.map((d) => (
                <button
                  key={d.key}
                  className={`home__diff-btn${difficulty === d.key ? ' home__diff-btn--active' : ''}`}
                  onClick={() => setDifficulty(d.key)}
                >
                  <span className="home__diff-label">{t(d.key)}</span>
                  <span className="home__diff-timer">{d.timer}</span>
                  <span className="home__diff-hint">{t(`${d.key}Hint`)}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="home__start-btn"
            onClick={handleStart}
            disabled={!name.trim()}
          >
            {t('startGame')}
          </button>
        </div>

        <button
          className="home__leaderboard-link"
          onClick={() => navigate('/leaderboard')}
        >
          {t('viewLeaderboard')}
        </button>
      </div>
    </div>
  );
};

export default Home;
