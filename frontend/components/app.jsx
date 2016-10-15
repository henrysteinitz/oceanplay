import React from 'react';
import MenuBar from './menu_bar';
import Stream from './stream';
import NowPlaying from './now_playing';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {};
    this.setState({newTrack: false});
    props.loadLikes();
    props.loadRetracks();

    this._checkPlayPause = this._checkPlayPause.bind(this);
    this._analyseAudio = this._analyseAudio.bind(this);
    this._stopTrack = this._stopTrack.bind(this);
  }

  _checkPlayPause(){
    if (this.props.nowPlaying.playing){
      if (this.refs.audio.paused){
        this.refs.audio.play()
      }
    } else {
      if (!this.refs.audio.paused){
        this.refs.audio.pause()
      }
    }
  }

  _checkNewTime(){
    if(this.props.nowPlaying.newTime){
      this.refs.audio.currentTime = this.props.nowPlaying.newTime
      this.props.setTime(this.refs.audio.currentTime);
      this.props.clearNewTime();
    }
  }

  _analyseAudio(){
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // const analyser = audioCtx.createAnalyser();
    //
    // const source = audioCtx.createMediaElementSource(this.refs.audio);
    // source.connect(analyser);
    //
    // const bufferLength = analyser.frequencyBinCount;
    // const data = new Uint8Array(bufferLength);
    // analyser.getByteTimeDomainData(data);
    // debugger
  }

  componentDidUpdate(){
    this._checkPlayPause();
    this._checkNewTime();

    if (this.state.newTrack){
      this.setState({newTrack: false}, this._analyseAudio);
    }
    if (this.state.newTrack){

    }
  }

  _stopTrack(){
    this.refs.audio.pause();
    this.refs.audio.currentTime = 0;
    this.props.pause();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.nowPlaying.playing){
      if (!this.props.nowPlaying.playing ||
        this.props.nowPlaying.track.id !== nextProps.nowPlaying.track.id){
          this.setState({newTrack: true});
      }
    }
  }

  componentDidMount(){
    this.props.setDuration(this.refs.audio.duration)
    setInterval(() => {
      if (this.props.nowPlaying.playing){
        if (this.refs.audio){
          this.props.setTime(this.refs.audio.currentTime);
          this.props.setDuration(this.refs.audio.duration);
        }
      }
    }, 1.0);
  }

  render(){
    const source = this.props.nowPlaying.track.audioUrl;

    return (
      <div id='app'>
        <MenuBar />
        {this.props.children}
        <audio onEnded={this._stopTrack}
          id="audio" ref="audio" preload="none" src={source}>
          <source src={source}></source>
        </audio>
        <NowPlaying />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { setTime,
  setDuration,
  clearNewTime,
  pauseTrack,
  loadRetracks } from '../actions/track_actions';
import { loadLikes } from '../actions/like_actions';

const mapStateToProps = ({ nowPlaying }) => ({
  nowPlaying
});

const mapDispatchToProps = (dispatch) => ({
  setTime: (time) => dispatch(setTime(time)),
  setDuration: (duration) => dispatch(setDuration(duration)),
  clearNewTime: () => dispatch(clearNewTime()),
  loadLikes: () => dispatch(loadLikes()),
  loadRetracks: () => dispatch(loadRetracks()),
  pause: () => dispatch(pauseTrack())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
