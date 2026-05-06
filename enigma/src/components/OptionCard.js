import React from 'react';
import './OptionCard.scss';

const OptionCard = ({ text, state = 'default', onClick, disabled }) => (
  <button
    className={`option-card option-card--${state}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default OptionCard;
