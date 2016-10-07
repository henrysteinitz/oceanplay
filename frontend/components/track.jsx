import React from 'react';

class Track extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
    <div className="track">
      <img src="/test-art.jpg" className="track-art"/>
      <div className="track-right">
        <div className="track-title">{this.props.track.title}</div>
        <div className="track-artist">{this.props.track.artist}</div>
        <div className="play-bar">
          <button className="play-button"></button>
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

      <audio controls>
        <source src={this.props.track.audioUrl} />
      </audio>
    </div>
    );
  }
}

export default Track;
