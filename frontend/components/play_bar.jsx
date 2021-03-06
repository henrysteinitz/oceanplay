import React from 'react';


class PlayBar extends React.Component{
  constructor(props){
    super(props);

    this._renderTime = this._renderTime.bind(this);
  }

  componentDidUpdate(){
    this._renderTime();
  }

  componentDidMount(){
    this._renderTime();
  }

  _renderTime(){
    if (!this.props.scrubbing){
      const newWidth = this.props.time / this.props.duration;
      $(this.refs.inner).width(`${newWidth * 100}%`);
    }
  }

  render(){
    let outerClass = ""
    if (this.props.type === 'now'){
      outerClass = 'np-outer-play-bar';
    } else {
      outerClass = 'outer-play-bar';
    }
    return (
      <span className={outerClass}
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
