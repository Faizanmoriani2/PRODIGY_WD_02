import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
  const [lapStart, setLapStart] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startStop = () => {
    if (isRunning) {
      // Stop the timer and record lap time
      const lapTime = time - lapStart;
      setLapTimes([...lapTimes, lapTime]);
    } else {
      // Start a new lap
      setLapStart(time);
    }
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const reset = () => {
    setTime(0);
    setLapTimes([]);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className='stopwatch'>
      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <button className='btn start' onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button  className='btn reset' onClick={reset}>Reset</button>
      {lapTimes.length > 0 && (
        <div className='lap'>
          <h2>Lap Times</h2>
          <ul>
            {lapTimes.map((lapTime, index) => (
              <li key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
