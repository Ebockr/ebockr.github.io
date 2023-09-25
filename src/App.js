import React, { useState, useEffect, useCallback } from 'react';
import CountdownTimer from './CountdownTimer';
import InfoIcon from './InfoIcon';

function App() {
  // Specify your target date here (in milliseconds since epoch)
  const targetDate = new Date('2023-09-30T07:21:00+02:00').getTime();

  // Define a state variable to store the remaining time
  const [remainingHours, setRemainingHours] = useState(0);

  // Function to calculate the remaining time
  const calculateRemainingTime = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    return Math.max(0, Math.ceil(difference / (60 * 60 * 1000)));
  }, [targetDate]);

  useEffect(() => {
    // Calculate and set initial remaining hours
    setRemainingHours(calculateRemainingTime());

    // Update remaining hours every minute
    const updateInterval = setInterval(() => {
      setRemainingHours(calculateRemainingTime());
    }, 60000); // Update every minute (60 seconds * 1000 milliseconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(updateInterval);
  }, [calculateRemainingTime]);

  let h1Text = '';

  if (remainingHours <= 0) {
    h1Text =
      'Ich hoffe mal, dass du mich nicht vergessen hast... Ansonsten haben wir gerade bestimmt eine tolle Zeit zusammen :))';
  } else if (remainingHours <= 1) {
    h1Text = 'Falls ich gleich ein Morgenmuffel sein sollte... Schon mal ein provisorisches: Ich liebe dich <3';
  } else if (remainingHours <= 5) {
    h1Text = 'Ich bin noch fleißig am Flixbusfahren... oder eher schlafen, such schon mal nen Film raus ;)';
  } else if (remainingHours <= 10) {
    h1Text = 'Denk dran, morgen früh musst du so einen Fremden vom Bahnhof abholen ;)';
  } else if (remainingHours <= 15) {
    h1Text = 'Ich hoffe, mit den kleinen Sätzen hier kann ich dich auch unterhalten, wenn ich gerade in der Uni bin ;)';
  } else if (remainingHours <= 24) {
    h1Text = 'Nur noch ein Tag!!';
  } else if (remainingHours <= 48) {
    h1Text = 'Ich hoffe auch einen Tag später ist die Freude noch groß und die Blumen haben einen schönen Platz gefunden..';
  } else if (remainingHours <= 72) {
    h1Text = 'Wenn du das hier liest, sollte ich das Wettrennen um den Titel "Freund des Jahres" sicher in der Tasche haben ;)';
  } else {
    h1Text = 'Gar nicht mehr lange...';
  }

  return (
    <div className="App">
      <h1>{h1Text}</h1>
      <CountdownTimer targetDate={targetDate} />
      <InfoIcon />
    </div>
  );
}

export default App;

