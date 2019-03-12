import React from 'react'
import './css/time.css';

function Timer (props) {
  return (
    <span className="time">
      <span>{props.time}</span>
      <span> / </span>
      <span>{props.length}</span>
    </span>
  )
}

export default Timer
