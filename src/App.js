import React, { Component } from 'react';
import './css/App.css';
import Player from './Player';


class App extends Component {
  render() {
    return (
      <Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    );
  }
}

export default App;
