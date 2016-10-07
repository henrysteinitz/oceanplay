import React from 'react';
import MenuBar from './menu_bar';
import Stream from './stream';

class App extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidUpdate(){

    if (this.props.nowPlaying.playing){
      console.log('asdfasdf');
      this.refs.audio.play()
    } else {
      console.log('yo');
      if (this.refs.audio){
        this.refs.audio.pause()
      }
    }
  }

  render(){
    let audio;
    if (this.props.nowPlaying.playing){
      audio = <audio ref="audio">
                <source src={this.props.nowPlaying.track.audioUrl} />
              </audio>;
    } else {
      audio = "";
    }

    return (
      <div id='app'>
        <MenuBar />
        {this.props.children}
        {audio}
      </div>
    );
  }
}

import { connect } from 'react-redux';

const mapStateToProps = ({ nowPlaying }) => ({
  nowPlaying
});

export default connect(mapStateToProps, null)(App);
