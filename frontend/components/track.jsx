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
        <div className="track-title">Videotape</div>
        <div className="track-artist">Radiohead</div>
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
    </div>
    );
  }
}

export default Track;
