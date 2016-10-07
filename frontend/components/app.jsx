import React from 'react';
import MenuBar from './menu_bar';
import Stream from './stream';


class App extends React.Component{

  constructor(props){
    super(props);

    this._checkPlayPause = this._checkPlayPause.bind(this);
  }

  componentWillUpdate(nextProps, nextState){
    if (nextProps.nowPlaying && this.props.nowPlaying){
      if(nextProps.nowPlaying.track.id == this.props.nowPlaying.track.id){
        //this._checkPlayPause(nextProps);
      }
    }
  }

  _checkPlayPause(newProps){
    if (newProps.nowPlaying.playing){
      this.refs.audio.play()
    } else {
      this.refs.audio.pause()
    }
  }

  componentDidUpdate(){
    this._checkPlayPause(this.props);

    //this.refs.audio.crossOrigin = "anonymous";
    //let analyser = require('web-audio-analyser')(this.refs.audio);
    //console.log(analyser.waveform())
  }



  render(){
    const source = this.props.nowPlaying.track.audioUrl;

    return (
      <div id='app'>
        <MenuBar />
        {this.props.children}
        <audio id="testau" ref="audio" preload="none" src={source}>
        </audio>
      </div>
    );
  }
}

import { connect } from 'react-redux';

const mapStateToProps = ({ nowPlaying }) => ({
  nowPlaying
});

export default connect(mapStateToProps, null)(App);
