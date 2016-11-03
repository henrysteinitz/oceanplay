import React from 'react';
import Logo from './logo';
import AccountNav from './account_nav';
import UploadForm from './upload_form';
import SearchResults from './search_results';
import { Link } from 'react-router';

class MenuBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hidden: true,
      searchHidden: true,
      locked: false,
      uploadX: false,
      lastSearch: null
    };

    this._releaseUploadForm = this._releaseUploadForm.bind(this);
    this._returnUploadForm = this._returnUploadForm.bind(this);
    this._toggleUploadForm = this._toggleUploadForm.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._releaseSearch = this._releaseSearch.bind(this);
    this._returnSearch = this._returnSearch.bind(this);
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

  _handleSearch(e){

    const searchString = e.currentTarget.value;
    if (searchString === "") {
      this._returnSearch()
      //clearTimeout(this.state.lastSearch);
      this.props.clearResults();
    } else {
      this._releaseSearch();
      //clearTimeout(this.state.lastSearch);
      this.props.search(searchString, () => {});
      //this.state.lastSearch = setTimeout(() => {
      //  this.props.search(searchString, () => {});
      //}, 1000);
    }
  }

  _releaseSearch(){
    if (this.state.searchHidden && !this.state.locked){
      this.state.locked = true;
      $(this.refs.uploadForm.refs.uploadBackground).addClass('animated fadeIn');
      $(this.refs.uploadForm.refs.uploadBackground).css('visibility', 'visible');
      $(this.refs.searchResults.refs.searchResults).addClass('animated fadeInDown');
      $(this.refs.searchResults.refs.searchResults).css('visibility', 'visible');
      setTimeout(() => {
        $(this.refs.uploadForm.refs.uploadBackground).removeClass('animated fadeIn');
        $(this.refs.uploadForm.refs.searchResults).removeClass('animated fadeInDown');
        this.setState({searchHidden: false, locked: false});
      }, 570);
    }
  }

  _returnSearch(){
    if (!this.state.searchHidden){
      this.state.locked = true;
      $(this.refs.uploadForm.refs.uploadBackground).addClass('animated fadeOut');
      $(this.refs.searchResults.refs.searchResults).addClass('animated fadeOutUp');
      setTimeout(() => {
        $(this.refs.uploadForm.refs.uploadBackground).removeClass('animated fadeOut');
        $(this.refs.uploadForm.refs.uploadBackground).css('visibility', 'hidden');
        $(this.refs.searchResults.refs.searchResults).removeClass('animated fadeOutUp');
        $(this.refs.searchResults.refs.searchResults).css('visibility', 'hidden');
        this.setState({searchHidden: true, locked: false});
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

    let searchArtists = [];
    if (this.props.searchResults.artists) {
      searchArtists = this.props.searchResults.artists;
    }

    let searchTracks = [];
    if (this.props.searchResults.tracks) {
      searchTracks = this.props.searchResults.tracks;
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

            <input
              className="search-box"
              type="text"
              onChange={this._handleSearch}
              onFocus={this._handleSearch} >
            </input>
            <img className="search-icon" src="search.png" />

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

        <SearchResults
          ref="searchResults"
          artists={searchArtists}
          tracks={searchTracks}
          returnSearch={this._returnSearch}
          releaseSearch={this._releaseSearch} />

        <UploadForm
          ref='uploadForm'
          returnUploadForm={this._returnUploadForm}
          returnSearch={this._returnSearch}
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

import { search, clearResults } from '../actions/search_actions';

const mapStateToProps = ({ session, profile, stream, search }) => ({
  currentUser: session.user,
  streamKind: stream.kind,
  searchResults: search.results,
  profile
});

const mapDispatchToProps = (dispatch) => ({
  uploadTrack: (trackData, callback) => (
    dispatch(uploadTrack(trackData, callback))
  ),
  receiveTrack: (track) => {
    dispatch(receiveTrackForStream(track));
  },
  search: (string, callback) => dispatch(search(string, callback)),
  clearResults: () => dispatch(clearResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
