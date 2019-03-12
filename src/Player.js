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
    videoDuration: null,
    currentTime: null,
    volume: 0.5
  };

  vidRef = React.createRef();
  divVidRef = React.createRef();

  play = () => {
    if (this.state.paused === true) {
      this.vidRef.current.play();
      this.setState({
        paused: false
        });
    }
    else {
      this.vidRef.current.pause();
      this.setState({
        paused: true
        });
    }
  }

  currentTime = () => {
    let cur = this.vidRef.current.currentTime;
    cur = cur.toFixed();
    return cur;
  }

  duration = () => {
    let dur = this.vidRef.current.duration;
    dur = dur.toFixed();
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
        volume: 0
      });
    }
    else {
      this.vidRef.current.volume = volume_range.value;
      this.vidRef.current.muted = false;
      this.setState({
        muted: false,
        volume: volume_range.value
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

  handleMuteButton = () => {
    if (this.state.muted === true) {
      this.vidRef.current.muted = false;
      this.vidRef.current.volume = 0.5;
      this.setState({
        volume: 0.5,
        muted: false
      });
    }
    else {
      this.vidRef.current.muted = true;
      this.vidRef.current.volume = 0;
      this.setState({
        volume: 0,
        muted: true
      });
    }
  }

  componentDidMount() {
    this.vidRef.current.onloadedmetadata = (event) => {
      this.setState({
        currentTime: this.currentTime(),
        videoDuration: this.duration()
      })
    }

    this.vidRef.current.ontimeupdate = (event) => {
      this.setState({ currentTime: this.currentTime() })
    };

    this.vidRef.current.onended = (event) => {
      this.setState({
        paused: true
      });
    };
  }

  render() {
    return (
      <div ref={this.divVidRef} className="videoPlayer">

        <video ref={this.vidRef} onClick={this.play} width="100%" height="auto">
          <source src={this.props.src} type="video/mp4" />
        </video>

        <div className="controls">

          <Button
            onClick={this.play}
            pause={this.state.paused}
            svg={this.state.paused ? constants.playSVG : constants.pauseSVG}
          />

          <Timer
            currentTime={constants.toHHMMSS(this.state.currentTime)}
            videoDuration={constants.toHHMMSS(this.state.videoDuration)}
          />

          <Track
            onChange={(e) => this.handleTimeTrack(e)}
            value={this.state.currentTime}
            max={this.state.videoDuration}
          />

          <Button
            onClick={this.handleMuteButton}
            svg={this.state.muted ? constants.muteSVG : constants.volumeSVG}
          />

          <Track
            class={"volumeTrack"}
            onChange={(e) => this.handleVolumeTrack(e)}
            value={this.state.volume}
          />

          <Button
            onClick={this.toggleFullScreen}
            svg={constants.fullscreenSVG}
          />

        </div>
      </div>
    );
  }
}

export default Player
