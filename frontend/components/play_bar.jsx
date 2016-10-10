import React from 'react';


class PlayBar extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidUpdate(){
    if (!this.props.scrubbing){
      const newWidth = this.props.time / this.props.duration;
      $(this.refs.inner).width(`${newWidth * 100}%`);
    }
  }

  render(){
    return (
      <span className="outer-play-bar"
         onMouseDown={this.props.startScrub}
         ref="outer">
        <span ref="inner" className="inner-play-bar">
        </span>
        <span ref="marker" className="scrub-marker">
        </span>
      </span>
    );
  }
}

export default PlayBar;
