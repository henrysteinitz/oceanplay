import React from 'react';
import Track from './track';

class Stream extends React.Component{
  constructor(props){
    super(props);

    this.state = { tracks: [] }
  }

  render(){
    const tracks = this.props.tracks.map( (track) => (
      <Track track={track} key={track.id} />
    ));

    return (
      <div className="stream bottom-padding">
        {tracks}
      </div>
    );
  }
}

export default Stream;
