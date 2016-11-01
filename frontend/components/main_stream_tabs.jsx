import React from 'react';

class MainStreamTabs extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="tabs">
        <span className="tab selected-tab"
          ref='recent'
          onClick={() => this.props.loadStream('recent')}>
            Recent
        </span>
        <span className="tab"
          ref='popular'
          onClick={() => this.props.loadStream('popular')}>
            Popular
        </span>
        <span className="tab"
          ref='discover'
          onClick={() => this.props.loadStream('discover')}>
            Discover
        </span>
      </div>
    );
  }

}

export default MainStreamTabs;
