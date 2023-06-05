import React from 'react';
import { useState, useRef, useEffect } from "react";

const formatTime = (time) => {
  let hours = Math.floor(time / 3600)
  let minutes = Math.floor((time - hours*3600) / 60)
  let seconds = Math.floor(time - ((minutes*60)+(hours*3600)))

  if (hours <= 10) hours = "0" + hours;
  if (minutes <= 10) minutes = "0" + minutes;
  if (seconds <= 10) seconds = "0" + seconds;

  return hours + ":" + minutes + ":" + seconds; 
}

const CountDown = ({seconds}) => {
  const [ countdown, setCountDown ] = useState(seconds);
  const timerId = useRef()

  useEffect(() => {
    timerId.current - setInterval(() => {
      setCountDown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if( countdown <= 0) {
      clearInterval(timerId.current)
      page.reload();
      alert("END! Reload the page to see the winner")
    }
  }, [countdown])


  return (
    <div className='bg-black text-red-600 w-full text-center'>
      <h1 className='text-8xl'>{formatTime(countdown+120)}</h1>
    </div>
  );
};

export default CountDown;
