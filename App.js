import React, { useState, useEffect } from 'react';
import './App.css';
import Background from './images/gogin2.jpg'



function CountdownClock() {

  const [time, setTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [endDate, setEndDate] = useState(null);

  function startTimer(duration) {
    setIsActive(true);
    setEndDate(new Date().getTime() + duration);
  }

  function stopTimer() {
    setIsActive(false);
    setEndDate(null);
  }

  function resetTimer() {
    setTime({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    setIsActive(false);
    setEndDate(null);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        // Calculate time
        const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTime({ months, days, hours, minutes, seconds });
      }, 1000);
    } else if (!isActive && endDate !== null) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, endDate]);


  return (
<div style={{
  backgroundImage: `url(${Background})` ,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh'
}}>
  <div className="text-section"> <p>
    This app is designed to help you form a new habit in just 21 days. Whether you want to start exercising every day, meditating every morning, or reading before bed, this countdown clock can help you track your progress and stay motivated. By setting a specific end date and seeing the countdown decrease every day, you can stay focused on your goal and celebrate your achievements along the way. Whether you're just starting out or you're looking to maintain an existing habit, this app can help you stay on track and reach your goals.
  </p></div>

      <div className="countdown-clock" >
        <div className="countdown-time">Months: {time.months}</div>
        <div className="countdown-time">Days: {time.days}</div>
        <div className="countdown-time">Hours: {time.hours}</div>
        <div className="countdown-time">Minutes: {time.minutes}</div>
        <div className="countdown-time">Seconds: {time.seconds}</div>
        {!isActive && endDate === null && (
            <button className="countdown-button" onClick={() => startTimer(1000 * 60 * 60 * 24   + 1000 * 60 * 60 * 24 * 20)}>
              Start Timer
            </button>
        )}
        {isActive && endDate !== null && (
            <button className="countdown-button" onClick={stopTimer}>Reset</button>
        )}

      </div>
</div>
  );
}

export default CountdownClock;
