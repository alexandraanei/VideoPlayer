import React from 'react';
import './css/button.css';

function Button(props) {
  return (
    <button onClick={props.onClick} className="button">
      {props.svg}
    </button>
  )
}

export default Button
