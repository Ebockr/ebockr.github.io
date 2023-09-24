import React, { useState, useEffect } from 'react';
import './CountdownProgressBar.css';

const CountdownProgressBar = ({ targetDate }) => {
  const totalDuration = 14 * 24; // 14 days in milliseconds
  const [remainingHours, setRemainingHours] = useState();
  const calculateRemainingHours = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    return Math.max(0, Math.ceil(difference / (60 * 60 * 1000)));
  };

  useEffect(() => {
    // Calculate and set initial remaining hours
    setRemainingHours(calculateRemainingHours());

    // Update remaining hours every minute
    const updateInterval = setInterval(() => {
      setRemainingHours(calculateRemainingHours());
    }, 60000); // Update every minute (60 seconds * 1000 milliseconds)

    return () => clearInterval(updateInterval);
  }, [targetDate]);

  const calculateBackgroundColor = () => {
    const progress = (totalDuration - remainingHours) / totalDuration * 100;

    // Determine the color based on the progress and remaining hours
    let color;
    if (remainingHours <= 0) {
      color = 'blue'; // Countdown has reached or passed 0 hours
    } else if (progress < 100) {
      color = `linear-gradient(to right, red ${progress}%, white ${progress}%)`;
    } else {
      color = 'white'; // Countdown is not over, but progress is complete
    }

    return color;
  };

  return (
    <div className="progress-container">
      {/* Left Label */}
      <div className="circle-label label-left">Zürich</div>

      <div
        className="progress-circle left"
        style={{
          background: 'white',
        }}
      ></div>

      <div
        className="progress-bar"
        style={{
          width: '100%',
          background: calculateBackgroundColor(),
        }}
      ></div>

      {/* Right Label */}
      <div className="circle-label label-right">Leipzig</div>

      <div
        className="progress-circle right"
        style={{
          background: 'white',
        }}
      ></div>
    </div>
  );
};

export default CountdownProgressBar;
