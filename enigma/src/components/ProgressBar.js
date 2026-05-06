import React from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ current, total }) => (
  <div className="progress-bar">
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        className={`progress-bar__dot${
          i < current
            ? ' progress-bar__dot--done'
            : i === current
            ? ' progress-bar__dot--active'
            : ''
        }`}
      />
    ))}
  </div>
);

export default ProgressBar;
