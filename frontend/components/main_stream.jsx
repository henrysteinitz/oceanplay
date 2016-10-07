import React from 'react';
import Stream from './stream';

class MainStream extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return ( <Stream tracks={[]} />);
  }
}

export default MainStream;
