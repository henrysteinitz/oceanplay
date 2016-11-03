import React from 'react';
import { Link } from 'react-router';

class SearchResults extends React.Component {


  constructor(props){
    super(props);
    this._autoResize.bind(this);
  }

  _autoResize(e){
    if (e.currentTarget.naturalWidth > e.currentTarget.naturalHeight){
      $(e.currentTarget).height('100%');
      $(e.currentTarget).width('auto');
    } else {
      $(e.currentTarget).height('auto');
      $(e.currentTarget).width('100%');
    }
  }

  render(){
    const artistTags = this.props.artists.map((artist) => (
      <Link className="result-link" to={`profile/${artist.id}`} onClick={this.props.returnSearch}>
        <div className="result">
          <span className="result-img artist-img">
            <img onLoad={this._autoResize} src={artist.profUrl} />
          </span>
          <span className="result-text">
            {artist.username}
          </span>
        </div>
      </Link>
    ));

    const trackTags = this.props.tracks.map((track) => (
      <Link className="result-link" to={`track/${track.id}`} onClick={this.props.returnSearch}>
        <div className="result">
          <span className="result-img">
            <img onLoad={this._autoResize} src={track.artUrl} />
          </span>
          <span className="result-text">
            {track.title}
          </span>
        </div>
      </Link>
    ));

    let artistsHeader = "";
    if (artistTags.length > 0) {
      artistsHeader = ( <div className="search-header"> Artists </div> );
    }

    let tracksHeader = "";
    if (trackTags.length > 0) {
      tracksHeader = ( <div className="search-header"> Tracks </div> );
    }

    return (
      <div className="search-results" ref="searchResults">
        {artistsHeader}
        {artistTags}
        {tracksHeader}
        {trackTags}
      </div>
    );
  }

}

export default SearchResults;
