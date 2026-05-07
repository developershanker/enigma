import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveScore } from '../utils/storage';
import Confetti from '../components/Confetti';
import RiseParticles from '../components/RiseParticles';
import './Results.scss';

const getTier = (pct) => {
  if (pct >= 80) return { label: 'Brilliant!',  icon: '🏆', cls: 'gold',   animation: 'confetti' };
  if (pct >= 50) return { label: 'Well Done!',  icon: '⭐', cls: 'silver', animation: 'sparkle'  };
  return           { label: 'Keep Trying!', icon: '💪', cls: 'bronze', animation: 'rise'     };
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const saved = useRef(false);
  const state = location.state;

  useEffect(() => {
    if (!state) { navigate('/'); return; }
    if (saved.current) return;
    saved.current = true;
    saveScore({
      name: state.playerName,
      score: state.score,
      difficulty: state.difficulty,
      date: new Date().toLocaleDateString(),
    });
  }, [state, navigate]);

  if (!state) return null;

  const { score, answers, playerName, difficulty, maxScore } = state;
  const pct = Math.round((score / maxScore) * 100);
  const tier = getTier(pct);
  const correct = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="results">
      {/* Animations — rendered behind content via z-index */}
      {tier.animation === 'confetti' && <Confetti />}
      {tier.animation === 'sparkle'  && <Confetti count={45} gold />}
      {tier.animation === 'rise'     && <RiseParticles />}

      <div className="results__content">

        <div className={`results__hero results__hero--${tier.cls}`}>
          <span className="results__icon">{tier.icon}</span>
          <h1 className="results__tier">{tier.label}</h1>
          <p className="results__player">{playerName}</p>

          <div className="results__score-row">
            <span className="results__score">{score}</span>
            <span className="results__score-max">/ {maxScore} pts</span>
          </div>

          <div className="results__meta">
            <span className="results__badge">{difficulty}</span>
            <span className="results__correct">{correct}/{answers.length} correct</span>
          </div>
        </div>

        <div className="results__breakdown">
          <h2 className="results__breakdown-title">Question Breakdown</h2>
          {answers.map((a, i) => (
            <div
              key={i}
              className={`results__item results__item--${a.isCorrect ? 'correct' : 'wrong'}`}
            >
              <div className="results__item-top">
                <span className="results__item-icon">{a.isCorrect ? '✓' : '✗'}</span>
                <span className="results__item-pts">+{a.points} pts</span>
              </div>
              <p className="results__item-q">{a.question}</p>
              {!a.isCorrect && (
                <p className="results__item-ans">
                  {a.userAnswer ? `You answered: ${a.userAnswer} · ` : 'Time ran out · '}
                  <strong>Correct: {a.correctAnswer}</strong>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="results__actions">
          <button
            className="results__btn results__btn--primary"
            onClick={() => navigate('/')}
          >
            Play Again
          </button>
          <button
            className="results__btn results__btn--secondary"
            onClick={() => navigate('/leaderboard')}
          >
            Leaderboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default Results;
