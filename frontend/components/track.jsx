import React from 'react';
import PlayBar from './play_bar';

class Track extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      scrubbing: false,
      scrubPos: 0
    }

    this._playpause = this._playpause.bind(this);
    this._addButtonIcon = this._addButtonIcon.bind(this);
    this._startScrub = this._startScrub.bind(this);
    this._endScrub = this._endScrub.bind(this);
    this._updateInner = this._updateInner.bind(this);
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
    const pageX = e.pageX;
    this.setState({scrubbing: true}, () => this._updateInner(null, pageX));
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

  componentDidUpdate(){
    this._addButtonIcon();
  }

  componentDidMount(){
    this._addButtonIcon();
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


    return (
    <div className="track"
      onMouseUp={this._endScrub}
      onMouseMove={this._updateInner}>
      <img src={this.props.track.artUrl} className="track-art"/>
      <div className="track-right">
        <div className="track-title">{this.props.track.title}</div>
        <div className="track-artist">{this.props.track.artist}</div>
        <div className="play-bar">
          <div className="controls">
            <button ref="playButton"
              className="play-button play-image"
              onClick={this._playpause}></button>

            <div className='right-controls-container'>
              <button className="comment-button right-control"></button>
              <button className="retrack-button right-control"></button>
              <button className="like-button right-control"></button>
            </div>
          </div>
          <PlayBar time={time}
            ref="playBar"
            duration={this.props.duration}
            scrubbing={this.state.scrubbing}
            startScrub={this._startScrub} />
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
import { playTrack, pauseTrack, setNewTime } from '../actions/track_actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ nowPlaying }) => ({
  playing: nowPlaying.playing,
  currentTrack: nowPlaying.track,
  time: nowPlaying.time,
  duration: nowPlaying.duration
});

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
  setNewTime: (time) => dispatch(setNewTime(time))
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
