import React, { useState } from 'react';
import './InfoIcon.css';

const InfoIcon = () => {
  const [showText, setShowText] = useState(false);

  const handleIconClick = () => {
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 5000);
  };

  return (
    <div className="info-icon-container">
      <div
        className={`info-icon ${showText ? 'scaled' : ''}`}
        onClick={handleIconClick}
      >
        ℝ
      </div>
      {showText && <div className="info-text">Keine Sorge, Grafikdesigner werde ich nicht.
      Werde aber ab und zu noch weiter daran arbeiten ;)</div>}
    </div>
  );
};

export default InfoIcon;
