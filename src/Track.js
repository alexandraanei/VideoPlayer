import React from 'react'
import './css/track.css';

function Track(props) {
  return (
    <input
      type="range"
      className={props.class}
      onChange={props.onChange}
      value={props.value}
      step={0.01}
      min={0}
      max={props.max || 1}
    />
  )
}

export default Track
