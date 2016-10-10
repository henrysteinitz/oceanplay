import React from 'react';
import MenuBar from './menu_bar';
import Stream from './stream';


class App extends React.Component{

  constructor(props){
    super(props);

    this._checkPlayPause = this._checkPlayPause.bind(this);
  }

  _checkPlayPause(){
    if (this.props.nowPlaying.playing){
      this.refs.audio.play()
    } else {
      this.refs.audio.pause()
    }
  }

  _checkNewTime(){
    if(this.props.nowPlaying.newTime){
      this.refs.audio.currentTime = this.props.nowPlaying.newTime
      this.props.setTime(this.refs.audio.currentTime);
      this.props.clearNewTime();
    }
  }

  componentDidUpdate(){
    this._checkPlayPause();
    this._checkNewTime();
    //let analyser = require('web-audio-analyser')(this.refs.audio);
    //console.log(analyser.waveform())
  }

  componentDidMount(){
    this.props.setDuration(this.refs.audio.duration)
    setInterval(() => {
      if (this.props.nowPlaying.playing){
        this.props.setTime(this.refs.audio.currentTime);
        this.props.setDuration(this.refs.audio.duration)
      }
    }, 1.0);
  }

  render(){
    const source = this.props.nowPlaying.track.audioUrl;

    return (
      <div id='app'>
        <MenuBar />
        {this.props.children}
        <audio id="audio" ref="audio" preload="none" src={source}>
        </audio>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { setTime, setDuration, clearNewTime} from '../actions/track_actions';

const mapStateToProps = ({ nowPlaying }) => ({
  nowPlaying
});

const mapDispatchToProps = (dispatch) => ({
  setTime: (time) => dispatch(setTime(time)),
  setDuration: (duration) => dispatch(setDuration(duration)),
  clearNewTime: () => dispatch(clearNewTime())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
