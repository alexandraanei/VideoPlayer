import React from 'react'
import './css/time.css';

function Timer (props) {
  return (
    <span className="time">
      <span>{props.currentTime}</span>
      <span> / </span>
      <span>{props.videoDuration}</span>
    </span>
  )
}

export default Timer
