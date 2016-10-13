import React from 'react';
import PlayBar from './play_bar';
import { Link } from 'react-router';

class NowPlaying extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      scrubbing: false,
      showing: false
    };

    this._playpause = this._playpause.bind(this);
    this._addButtonIcon = this._addButtonIcon.bind(this);
    this._startScrub = this._startScrub.bind(this);
    this._endScrub = this._endScrub.bind(this);
    this._updateInner = this._updateInner.bind(this);
    this._updateUI = this._updateUI.bind(this);
  }
  _playpause(){
    if (this.props.playing){
      this.props.pauseTrack();
    } else {
      this.props.playTrack(this.props.track);
    }
  }

  _addButtonIcon(){
    if (this.props.playing){
      $(this.refs.playButton).removeClass('play-image');
      $(this.refs.playButton).addClass('pause-image');
    } else {
      $(this.refs.playButton).addClass('play-image');
      $(this.refs.playButton).removeClass('pause-image');
    }
  }

  _startScrub(e){
    e.preventDefault();
    if (this.props.currentTrack){
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

  _updateUI(){
    this._addButtonIcon();
    if (this.state.showing && !this.props.showPlayer){
      this.setState({showing: false}, () => {
          $(this.refs.nowContainer).css('display', 'none');
      });
    }
    if (!this.state.showing && this.props.showPlayer){
      this.setState({showing: true}, () => {
          $(this.refs.nowContainer).css('display', 'block');
      });
    }
  }

  componentDidUpdate(){
    this._updateUI();
  }

  componentDidMount(){
    this._updateUI();
  }



  render(){
    let time = 0;
    if (this.state.scrubbing){
      const width = $(this.refs.playBar.refs.outer).width();
      time = (this.state.scrubPos / width) * this.props.duration;
    } else {
      time = this.props.time;
    }

    return (
      <div className="now-playing-container"
        onMouseUp={this._endScrub}
        onMouseMove={this._updateInner}
        ref="nowContainer">
        <div className="now-playing-play-button"
          ref='playButton'
          onClick={this._playpause}></div>
        <div className="now-info-container">
          <Link className="np-title-link" to={`/track/${this.props.currentTrack.id}`}>
            <div className='now-playing-title'>{this.props.currentTrack.title}</div>
          </Link>
          <Link className="np-artist-link" to={`/profile/${this.props.currentTrack.artist_id}`}>
            <div className='now-playing-artist'>{this.props.currentTrack.artist}</div>
          </Link>
          <PlayBar
            type="now"
            ref='playBar'
            time={time}
            duration={this.props.duration}
            scrubbing={this.state.scrubbing}
            startScrub={this._startScrub} />
        </div><br />
      <Link to={`/track/${this.props.currentTrack.id}`}>
        <img src={this.props.currentTrack.artUrl} className='now-playing-art' />
      </Link>
      </div>
    );
  }
}

// Redux Container
import { playTrack,
  pauseTrack,
  setNewTime,
  showNowPlaying,
  hideNowPlaying } from '../actions/track_actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ nowPlaying, likes }, ownProps) => ({
  playing: nowPlaying.playing,
  currentTrack: nowPlaying.track,
  time: nowPlaying.time,
  duration: nowPlaying.duration,
  showPlayer: nowPlaying.showPlayer
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
  setNewTime: (time) => dispatch(setNewTime(time))
});

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
