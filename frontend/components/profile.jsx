import React from 'react';
import Stream from './stream';
import ProfilePanel from './profile_panel';
import ProfileTabs from  './profile_tabs';
//import Stats from './stats';

class Profile extends React.Component{

  constructor(props){
    super(props)

    this.props.clearStream();
    this.props.loadProfile(this.props.params.id);
    console.log(this.props.params.id);
  }

  render(){
    return (
      <main>
        <ProfilePanel />
        <ProfileTabs userId={this.props.params.id}/>
        <Stream tracks={this.props.stream.tracks} />
        {/* <Stats /> */}
      </main>
    );
  }
}

// Redux Container
import { connect } from 'react-redux';
import { loadProfile } from '../actions/profile_actions'
import { clearStream } from '../actions/stream_actions'

const mapStateToProps = ({ stream }) => ({
  stream
})

const mapDispatchToProps = (dispatch) => ({
  loadProfile: (id) => dispatch(loadProfile(id)),
  clearStream: () => dispatch(clearStream())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
