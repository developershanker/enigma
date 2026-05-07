import React, { useMemo } from 'react';
import './Confetti.scss';

const COLORS      = ['#f97316','#fbbf24','#22c55e','#3b82f6','#a855f7','#ef4444','#ec4899','#06b6d4'];
const GOLD_COLORS = ['#fbbf24','#f59e0b','#fde68a','#fcd34d','#f97316','#fef3c7'];

const Confetti = ({ count = 90, gold = false }) => {
  const pieces = useMemo(() => {
    const palette = gold ? GOLD_COLORS : COLORS;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left:     Math.random() * 100,
      delay:    Math.random() * 3.5,
      duration: 2.8 + Math.random() * 3,
      color:    palette[Math.floor(Math.random() * palette.length)],
      width:    6 + Math.random() * 9,
      height:   Math.random() > 0.45 ? 3 + Math.random() * 5 : 6 + Math.random() * 9,
      radius:   Math.random() > 0.4 ? '2px' : '50%',
      rotate:   Math.floor(Math.random() * 360),
    }));
  }, [count, gold]);

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map(p => (
        <span
          key={p.id}
          className="confetti__piece"
          style={{
            left:              `${p.left}%`,
            animationDelay:    `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor:   p.color,
            width:             `${p.width}px`,
            height:            `${p.height}px`,
            borderRadius:      p.radius,
            '--rotate':        `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
