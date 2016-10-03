import React from 'react';
import Track from './track';

class Stream extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="stream">
        <Track />
        <Track />
        <Track />
        <Track />
      </div>
    );
  }
}

export default Stream;
