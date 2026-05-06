import React from 'react';
import './Timer.scss';

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Timer = ({ seconds, maxSeconds = 20 }) => {
  const progress = Math.max(seconds / maxSeconds, 0);
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const isDanger = seconds <= 7;

  return (
    <div className={`timer${isDanger ? ' timer--danger' : ''}`}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={RADIUS} className="timer__track" />
        <circle
          cx="55"
          cy="55"
          r={RADIUS}
          className="timer__progress"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 55 55)"
        />
      </svg>
      <span className="timer__label">{seconds}</span>
    </div>
  );
};

export default Timer;
