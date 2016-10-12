import React from 'react';
import Stream from './stream';
import MainStreamTabs from './main_stream_tabs';

class MainStream extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      selected: 'recent'
    }

    this._loadStream = this._loadStream.bind(this);
  }

  componentDidMount(){
    this.props.clearStream();
    this.props.loadMainStream('recent');
  }

  _loadStream(tab){
    if (this.state.selected !== tab){
      this.props.clearStream();
      this.props.loadMainStream(tab);
      $('.tab').removeClass('selected-tab');
      $(this.refs.tabs.refs[tab]).addClass('selected-tab');
      this.setState({ selected: tab });
    }
  }

  render(){
    return (
      <div className="main-stream-container">
        <MainStreamTabs ref='tabs' loadStream={this._loadStream}/>
        <div className="main-inner-stream-container">
          <Stream tracks={this.props.stream.tracks} />
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { loadMainStream, clearStream } from '../actions/stream_actions';

const mapStateToProps = ({ stream }) => ({ stream });

const mapDispatchToProps = (dispatch) => ({
  clearStream: () => dispatch(clearStream()),
  loadMainStream: (tab) => dispatch(loadMainStream(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainStream);
