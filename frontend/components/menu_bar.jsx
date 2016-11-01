import React from 'react';
import Logo from './logo';
import AccountNav from './account_nav';
import UploadForm from './upload_form';
import { Link } from 'react-router';

class MenuBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {hidden: true, locked: false, uploadX: false};

    this._releaseUploadForm = this._releaseUploadForm.bind(this);
    this._returnUploadForm = this._returnUploadForm.bind(this);
    this._toggleUploadForm = this._toggleUploadForm.bind(this);
  }

  _toggleUploadForm(){
    if (!this.state.locked) {
      if (this.state.hidden) {
        this._releaseUploadForm();
      } else {
        this._returnUploadForm();
      }
    }
  }

  _releaseUploadForm(){
    if (!this.state.locked && this.state.hidden){
      this.state.uploadX = true;
      console.log('asdfasd');
      this.setState({locked: true});
      $(this.refs.uploadForm.refs.uploadSheet).addClass('animated fadeInDown');
      $(this.refs.uploadForm.refs.uploadSheet).css('visibility', 'visible');
      $(this.refs.uploadForm.refs.uploadBackground).addClass('animated fadeIn');
      $(this.refs.uploadForm.refs.uploadBackground).css('visibility', 'visible');

      setTimeout(() => {
        $(this.refs.uploadForm.refs.uploadSheet).removeClass('animated fadeInDown');
        $(this.refs.uploadForm.refs.uploadBackground).removeClass('animated fadeIn');
        this.setState({hidden: false, locked: false});
      }, 570);
    }
  }

  _returnUploadForm(){
    if (!this.state.locked && !this.state.hidden){
      this.state.uploadX = false;
      this.setState({locked: true});
      $(this.refs.uploadForm.refs.uploadSheet).addClass('animated fadeOutUp');
      $(this.refs.uploadForm.refs.uploadBackground).addClass('animated fadeOut');

      setTimeout(() => {
        this.setState({hidden: true, locked:false});
        $(this.refs.uploadForm.refs.uploadSheet).css('visibility', 'hidden');
        $(this.refs.uploadForm.refs.uploadSheet).removeClass('animated fadeOutUp');
        $(this.refs.uploadForm.refs.uploadBackground).css('visibility', 'hidden');
        $(this.refs.uploadForm.refs.uploadBackground).removeClass('animated fadeOut');
      }, 570);
    }
  }

  componentDidMount(){
  }

  render(){

    let uploadSrc = "upload.png";
    if (this.state.uploadX){
      uploadSrc = "delete.png";
    }
    return (
      <div className='menu-bar-wrapper'>
        <nav className="menu-bar" onClick={this._returnUploadForm}>
          <Link to="/stream"><Logo type="menu"/></Link>
          <nav className="left-menu">
            <Link to={"/stream"} className="link">Stream</Link>
            <Link to={"/library"} className="link">Library</Link>
          </nav>
          <nav className="right-menu">
            <AccountNav />
            {/*
            <input className="search-box" type="text" >
            </input>
            <img className="search-icon" src="search.png" />
            */}
            <Link className="link" onClick={this._releaseUploadForm}>
                <img className="menu-icon upload-icon" src={uploadSrc}></img>
            </Link>

            {/*
              <Link className="link" onClick={this._releaseUploadForm}>
                <img src="/upload.png" className='menu-icon' />
              </Link>
              <Link className="link">
                <img src="/search.png" className='menu-icon' />
              </Link>
            */}
          </nav>
        </nav>
        <UploadForm
          ref='uploadForm'
          returnUploadForm={this._returnUploadForm}
          uploadTrack={this.props.uploadTrack}
          currentUser={this.props.currentUser}
          receiveTrack={this.props.receiveTrack}
          profile={this.props.profile}
          streamKind={this.props.streamKind} />
      </div>
    );
  }
}

// Redux Container
import { connect } from 'react-redux';
import { uploadTrack,
  receiveTrackForStream,
  clearNowPlaying } from '../actions/track_actions';

const mapStateToProps = ({ session, profile, stream }) => ({
  currentUser: session.user,
  streamKind: stream.kind,
  profile
});

const mapDispatchToProps = (dispatch) => ({
  uploadTrack: (trackData, callback) => (
    dispatch(uploadTrack(trackData, callback))
  ),
  receiveTrack: (track) => {
    dispatch(receiveTrackForStream(track));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
