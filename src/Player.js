import React from 'react'
import Button from './Button'
import Timer from './Timer'
import Track from './Track'
import * as constants from './constants';
import './css/videoPlayer.css';

class Player extends React.Component {
  state = {
    paused: true,
    muted: false,
    length: null,
    formattedLength: null,
    currentTime: null,
    formattedTime: null,
    volume: 0.5,
    playSVG: constants.playSVG,
    muteSVG: constants.volumeSVG
  };
  vidRef = React.createRef();
  divVidRef = React.createRef();
  timeTrackRef = React.createRef();
  volumeTrackRef = React.createRef();

  play = () => {
    this.duration();
    const v = this.vidRef.current;

    if (this.state.paused === true) {
      v.play();
      this.setState({
        paused: false,
        playSVG: constants.pauseSVG});
    }
    else {
      v.pause();
      this.setState({
        paused: true,
        playSVG: constants.playSVG});
    }
  }

  currentTime() {
    let cur = this.vidRef.current.currentTime;
    cur = cur.toFixed();
    let formattedTime = constants.toHHMMSS(cur);

    this.setState({
      currentTime: cur,
      formattedTime: formattedTime
    });

    if (parseInt(this.state.currentTime) === parseInt(this.state.length)) {
      this.setState({
        paused: true,
        playSVG: constants.playSVG});
    }

    return cur;
  }

  duration() {
    let dur = this.vidRef.current.duration;
    dur = dur.toFixed();
    let formattedLength = constants.toHHMMSS(dur);

    this.setState({
      length: dur,
      formattedLength: formattedLength
    });

    return dur;
  }

  handleTimeTrack = (event) => {
    const time_range = event.target
    this.vidRef.current.currentTime = time_range.value;

    this.setState({
      currentTime: time_range.value
    });
  }

  handleVolumeTrack = (event) => {
    const volume_range = event.target
    if (volume_range.value < 0.01) {
      this.vidRef.current.volume = 0;
      this.vidRef.current.muted = true;
      this.setState({
        muted: true,
        volume: 0,
        muteSVG: constants.muteSVG
      });
    }
    else {
      this.vidRef.current.volume = volume_range.value;
      this.vidRef.current.muted = false;
      this.setState({
        muted: false,
        volume: volume_range.value,
        muteSVG: constants.volumeSVG
      });
    }
  }

  toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      this.divVidRef.current.requestFullscreen();
    }
    else
      document.exitFullscreen();
  }

  mute = () => {
    if (this.state.muted === true) {
      this.vidRef.current.muted = false;
      this.vidRef.current.volume = 0.5;
      this.setState({
        volume: 0.5,
        muted: false,
        muteSVG: constants.volumeSVG
      });
    }
    else {
      this.vidRef.current.muted = true;
      this.vidRef.current.volume = 0;
      this.setState({
        volume: 0,
        muted: true,
        muteSVG: constants.muteSVG
      });
    }
  }

  componentDidMount() {
    setInterval(() => this.setState({ currentTime: this.currentTime() }), 10);
    setInterval(() => this.setState({ length: this.duration() }), 10);
  }

  render() {
    return (
      <div ref={this.divVidRef} className="videoPlayer">

        <video ref={this.vidRef} onClick={() => this.play()} width="100%" height="auto">
          <source src={this.props.src} type="video/mp4" />
        </video>

        <div className="controls">

          <Button
            onClick={() => this.play()}
            pause={this.state.paused}
            svg={this.state.playSVG}
          />

          <Timer
            time={this.state.formattedTime}
            length={this.state.formattedLength}
          />

          <Track
            class={"timeTrack"}
            ref={this.timeTrackRef}
            onChange={(e) => this.handleTimeTrack(e)}
            value={this.state.currentTime}
            max={this.state.length}
          />

          <Button
            onClick={() => this.mute()}
            svg={this.state.muteSVG}
          />

          <Track
            class={"volumeTrack"}
            ref={this.volumeTrackRef}
            onChange={(e) => this.handleVolumeTrack(e)}
            value={this.state.volume}
          />

          <Button
            onClick={() => this.toggleFullScreen()}
            svg={constants.fullscreenSVG}
          />

        </div>
      </div>
    );
  }
}

export default Player
