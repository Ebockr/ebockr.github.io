import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";
import CountdownProgressBar from './CountdownProgressBar';


const CountdownTimer = ({ targetDate }) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, );

  const calculateBackgroundColor = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return "#000"; // Background color when countdown reaches 0
    }

    const hue = (difference / 1000) % 360; // Continuous hue change
    return `hsl(${hue}, 100%, 30%)`; // Adjust saturation and lightness as needed
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      document.body.style.backgroundColor = calculateBackgroundColor();
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, ); // Add an empty dependency array here to run this effect once

  // Update the JSX structure of CountdownTimer.js
  return (
    <div className="countdown-container">
      <CountdownProgressBar targetDate={targetDate} />
      <div className="countdown">
        <div className="circle">
          <div className="countdown-text">
            <div className="countdown-inline">
              {String(timeRemaining.days).padStart(2, "0")}:
            </div>
            <div className="countdown-inline">
              {String(timeRemaining.hours).padStart(2, "0")}:
            </div>
            <div className="countdown-inline">
              {String(timeRemaining.minutes).padStart(2, "0")}:
            </div>
            <div className="countdown-inline">
              {String(timeRemaining.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountdownTimer;
