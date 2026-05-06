import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../utils/storage';
import './Leaderboard.scss';

const MEDALS = ['🥇', '🥈', '🥉'];

const Leaderboard = () => {
  const navigate = useNavigate();
  const entries = getLeaderboard();

  return (
    <div className="leaderboard">
      <div className="leaderboard__content">
        <div className="leaderboard__header">
          <h1 className="leaderboard__title">ENIGMASTERS</h1>
          <p className="leaderboard__subtitle">Hall of Fame</p>
        </div>

        {entries.length === 0 ? (
          <div className="leaderboard__empty">
            <p>No scores yet.</p>
            <p>Be the first to make the board!</p>
          </div>
        ) : (
          <div className="leaderboard__list">
            {entries.map((entry, i) => (
              <div
                key={i}
                className={`leaderboard__entry${i < 3 ? ' leaderboard__entry--podium' : ''}${i === 0 ? ' leaderboard__entry--first' : ''}`}
              >
                <span className="leaderboard__rank">
                  {i < 3 ? MEDALS[i] : `#${i + 1}`}
                </span>
                <div className="leaderboard__info">
                  <span className="leaderboard__name">{entry.name}</span>
                  <span className="leaderboard__meta">
                    {entry.difficulty} &middot; {entry.date}
                  </span>
                </div>
                <span className="leaderboard__pts">{entry.score} pts</span>
              </div>
            ))}
          </div>
        )}

        <div className="leaderboard__actions">
          <button
            className="leaderboard__play-btn"
            onClick={() => navigate('/')}
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
