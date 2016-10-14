import React from 'react';
import PlayBar from './play_bar';
import CommentList from './comment_list';
import { hashHistory } from 'react-router';

class TrackPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {scrubbing: false, scrubPos: 0};
    props.loadTrack(props.params.id);

    this._playpause = this._playpause.bind(this);
    this._addButtonIcon = this._addButtonIcon.bind(this);
    this._startScrub = this._startScrub.bind(this);
    this._endScrub = this._endScrub.bind(this);
    this._updateInner = this._updateInner.bind(this);
    this._like = this._like.bind(this);
    this._toProfile = this._toProfile.bind(this);
    this._postComment = this._postComment.bind(this);
    this._retrack = this._retrack.bind(this);
  }



  _playpause(){
    if (this.props.playing && this.props.currentTrack.id === this.props.track.id){
      this.props.pauseTrack();
    } else {
      this.props.playTrack(this.props.track);
    }
  }

  _addButtonIcon(){
    if (this.props.playing && this.props.currentTrack.id === this.props.track.id){
      $(this.refs.playButton).removeClass('play-image');
      $(this.refs.playButton).addClass('pause-image');
    } else {
      $(this.refs.playButton).addClass('play-image');
      $(this.refs.playButton).removeClass('pause-image');
    }
  }

  _startScrub(e){
    e.preventDefault();
    if (this.props.currentTrack && this.props.currentTrack.id === this.props.track.id){
      const pageX = e.pageX;
      this.setState({scrubbing: true}, () => this._updateInner(null, pageX));
    } else {
      this.props.playTrack(this.props.track);
    }
  }

  _endScrub(e){
    e.preventDefault();
    if (this.state.scrubbing){
      const width = $(this.refs.playBar.refs.outer).width()
      this.props.setNewTime((this.state.scrubPos / width) * this.props.duration);
      this.setState({scrubbing: false});
    }
  }

  _updateInner(e, pageX){
    if (e){
      pageX = e.pageX
      e.preventDefault();
    }
    if (this.state.scrubbing){
      const inner = $(this.refs.playBar.refs.inner)
      const offset = inner.offset()
      const scrubPos = pageX - offset.left;
      inner.width(`${scrubPos}px`);
      this.setState({ scrubPos });
    }
  }

  _like(){
    if (this.props.liked){
      this.props.unlike(this.props.track);
    } else {
      this.props.like(this.props.track);
    }
  }

  _toProfile(){
    hashHistory.push(`/profile/${this.props.track.artist_id}`)
  }

  _postComment(e){
    if (e.key === 'Enter'){
      let time;
      if (this.props.time){
        time = this.props.time;
      } else {
        time = 0;
      }

      this.props.postComment({
        track_id: this.props.params.id,
        body: e.currentTarget.value,
        time
      }, () => this.refs.newComment.value = "");
    }
  }

  _retrack(){
    if (this.props.retracked){
      this.props.deleteRetrack(this.props.track.id);
    } else {
      this.props.postRetrack(this.props.track.id);
    }
  }

  componentDidUpdate(){
    this._addButtonIcon();
  }

  componentDidMount(){
    this._addButtonIcon();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.props.loadTrack(nextProps.params.id);
    }
  }

  render(){
    let time = 0;
    if (this.props.currentTrack && this.props.currentTrack.id === this.props.track.id){
      if (this.state.scrubbing){
        const width = $(this.refs.playBar.refs.outer).width();
        time = (this.state.scrubPos / width) * this.props.duration;
      } else {
        time = this.props.time;
      }
    }

    let likedClass = "";
    if (this.props.liked){
      likedClass = "liked";
    }

    let retrackedClass ="";
    if (this.props.retracked){
      retrackedClass = "retracked";
    }

    return (
      <div className="track-page"
        onMouseUp={this._endScrub}
        onMouseMove={this._updateInner}>
        <div className="track-panel">
          <div className="left-panel">
            <div className="track-panel-title">
              {this.props.track.title}
            </div><br/>
          <div className="track-panel-artist" onClick={this._toProfile}>
            {this.props.track.artist}
          </div>
          <img src='' className="artist-icon" />
          <div className="controls">
            <button ref="playButton"
              className="panel-play-button play-image"
              onClick={this._playpause}></button>

            <div className='panel-right-controls-container'>
              <button className={`retrack-button right-control ${retrackedClass}`}
                onClick={this._retrack}></button>
              <button onClick={this._like}
                className={`like-button right-control ${likedClass}`}></button>
            </div>
          </div><br/>
          <PlayBar time={time}
              ref="playBar"
              duration={this.props.duration}
              scrubbing={this.state.scrubbing}
              startScrub={this._startScrub} />
          </div>
          <img className="track-panel-art" src={this.props.track.artUrl} />
        </div>
        <div className="comments-page">
          <input type="text"
            className="new-comment"
            ref="newComment"
            placeholder="Write a comment."
            onKeyPress={this._postComment}>
          </input>
          <CommentList />

        </div>
      </div>
    );
  }

}

import { connect } from 'react-redux';
import { loadTrack,
  playTrack,
  pauseTrack,
  setNewTime,
  postComment,
  postRetrack,
  deleteRetrack } from '../actions/track_actions';
import { like, unlike } from '../actions/like_actions';

const mapStateToProps = ({ track, nowPlaying, likes, retracks }, ownProps) => ({
  playing: nowPlaying.playing,
  currentTrack: nowPlaying.track,
  time: nowPlaying.time,
  duration: nowPlaying.duration,
  liked: likes[track.id],
  retracked: retracks[track.id],
  track
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
  setNewTime: (time) => dispatch(setNewTime(time)),
  loadTrack: (id) => dispatch(loadTrack(id)),
  like: (track) => dispatch(like(track.id)),
  unlike: (track) => dispatch(unlike(track.id)),
  postComment: (comment, callback) => dispatch(postComment(comment, callback)),
  postRetrack: (id, callback) => dispatch(postRetrack(id, callback)),
  deleteRetrack: (id) => dispatch(deleteRetrack(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackPage);
