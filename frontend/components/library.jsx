import React from 'react';
import Stream from './stream';

class Library extends React.Component{

  constructor(props){
    super(props);

    props.loadMainStream();
  }

  render(){
    return (
      <div className="top-padding library">
        <Stream tracks={this.props.stream.tracks}/>
      </div>
    );
  }

}

import { connect } from 'react-redux';
import { loadMainStream } from '../actions/stream_actions';

const mapStateToProps = ({ stream }) => ({ stream });

const mapDispatchToProps = (dispatch) => ({
  loadMainStream: () => dispatch(loadMainStream('library'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
