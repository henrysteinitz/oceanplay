import React from 'react';
import PlayBar from './play_bar';
import { hashHistory } from 'react-router';

class TrackPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {scrubbing: false};
    props.loadTrack(props.params.id);

    this._playpause = this._playpause.bind(this);
    this._toProfile = this._toProfile.bind(this);
  }

  _playpause(){
    if (this.props.playing && this.props.currentTrack.id === this.props.track.id){
      this.props.pauseTrack();
    } else {
      this.props.playTrack(this.props.track);
    }
  }

  _toProfile(){
    hashHistory.push(`/profile/${this.props.track.artist_id}`)
  }

  render(){
    return (
      <div className="track-page">
        <div className="track-panel">
          <div className="left-panel">
            <div className="track-panel-title">
              {this.props.track.title}
            </div><br/>
          <div className="track-panel-artist" onClick={this._toProfile}>
              {this.props.track.artist}
            </div><br/>
            <div className="controls">
              <button ref="playButton"
                className="panel-play-button play-image"
                onClick={this._playpause}></button>

              <div className='panel-right-controls-container'>
                <button className="retrack-button right-control"></button>
                <button onClick={this._like}
                  className={`like-button right-control`}></button>
              </div>
            </div><br/>
          <PlayBar time={this.props.time}
              ref="playBar"
              duration={this.props.duration}
              scrubbing={this.state.scrubbing}
              startScrub={this._startScrub} />
          </div>
          <img className="track-panel-art" src={this.props.track.artUrl} />
        </div>
        <div className="comments-page"></div>
      </div>
    );
  }

}

import { connect } from 'react-redux';
import { loadTrack, playTrack, pauseTrack } from '../actions/track_actions';

const mapStateToProps = ({ track, nowPlaying, likes }, ownProps) => ({
  playing: nowPlaying.playing,
  currentTrack: nowPlaying.track,
  time: nowPlaying.time,
  duration: nowPlaying.duration,
  liked: likes[track.id],
  track
});

const mapDispatchToProps = (dispatch) => ({
  loadTrack: (id) => dispatch(loadTrack(id)),
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackPage);
