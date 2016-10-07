import React from 'react';

class Track extends React.Component{
  constructor(props){
    super(props)
    this._playpause = this._playpause.bind(this);
  }


  _playpause(){
    if (this.props.playing){
      this.props.pauseTrack();
    } else {
      this.props.playTrack(this.props.track);
    }
  }

  render(){
    return (
    <div className="track">
      <img src="/test-art.jpg" className="track-art"/>
      <div className="track-right">
        <div className="track-title">{this.props.track.title}</div>
        <div className="track-artist">{this.props.track.artist}</div>
        <div className="play-bar">
          <button className="play-button" onClick={this._playpause}></button>
          <div className="scrubber"></div>
        </div>
        {/*
        <div className="like-and-comments">
          <button className="like-button"></button>
          <input type='text' className="comment-input"/>
          <button className="comment-button"></button>
        </div>
        */}

      </div>

    </div>
    );
  }
}

// Redux Container
import { playTrack, pauseTrack } from '../actions/track_actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ nowPlaying }) => ({
  playing: nowPlaying.playing,
  currentTrack: nowPlaying.track
});

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack())
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
