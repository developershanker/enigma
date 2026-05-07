import React, { useMemo } from 'react';
import './RiseParticles.scss';

const COLORS = ['#a855f7', '#6366f1', '#3b82f6', '#64748b', '#8b5cf6', '#475569'];

const RiseParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id:       i,
      left:     5 + Math.random() * 90,
      bottom:   5 + Math.random() * 55,
      delay:    Math.random() * 6,
      duration: 5 + Math.random() * 5,
      size:     5 + Math.random() * 12,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    })),
  []);

  return (
    <div className="rise-particles" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="rise-particles__orb"
          style={{
            left:              `${p.left}%`,
            bottom:            `${p.bottom}%`,
            animationDelay:    `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width:             `${p.size}px`,
            height:            `${p.size}px`,
            backgroundColor:   p.color,
          }}
        />
      ))}
    </div>
  );
};

export default RiseParticles;
