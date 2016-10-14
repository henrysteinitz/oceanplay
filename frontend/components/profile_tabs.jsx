import React from 'react';

class ProfileTabs extends React.Component{
  constructor(props){
    super(props)

    props.checkFollow(props.userId);
    this._follow = this._follow.bind(this);
    this._loadNewStream = this._loadNewStream.bind(this);
  }

  _follow(){
    if (this.props.following){
      this.props.unfollow(this.props.userId, (r) => console.log(r));
    } else {
      this.props.follow(this.props.userId, (r) => console.log(r));
    }
  }

  _loadNewStream(tab){
    if (this.props.tab !== tab){
      return () => this.props.loadProfileStream(tab, this.props.userId);
    }
  }

  render(){
    let buttonClass;
    let buttonText;
    let buttonClick;
    if (this.props.session.user.id === this.props.userId){
      buttonClass = "panel-follow-button not-following"
      buttonClick = this.props.handleClick;
      if (this.props.editing){
        buttonText = "Save";
      } else {
        buttonText = "Edit";
      }

    } else{
      buttonClick = this._follow
      if (this.props.following){
        buttonClass = "panel-follow-button following"
        buttonText = "Following"
      } else {
        buttonClass = "panel-follow-button not-following"
        buttonText = "Follow"
      }
    }

    let allClass = "";
    if (this.props.tab === 'all'){
      allClass = 'selected-tab';
    }

    let tracksClass = "";
    if (this.props.tab === 'tracks'){
      tracksClass = 'selected-tab';
    }

    let retracksClass = "";
    if (this.props.tab === 'retracks'){
      retracksClass = 'selected-tab';
    }

    return (

      <div className="tabs">
        <span className={`tab ${allClass}`} onClick={this._loadNewStream('all')} >
          All
        </span>
        <span className={`tab ${tracksClass}`} onClick={this._loadNewStream('tracks')}>
          Tracks
        </span>
        <span className={`tab ${retracksClass}`} onClick={this._loadNewStream('retracks')}>
          Retracks
        </span>

        <button className={buttonClass}
          onClick={buttonClick}>{buttonText}</button>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { followUser, unfollowUser, checkFollow } from '../actions/profile_actions';
import { loadProfileStream } from '../actions/stream_actions';

const mapStateToProps = ({ profile, session, stream }) => ({
  following: profile.following,
  tab: stream.kind,
  session
})

const mapDispatchToProps = (dispatch) => ({
  follow: (id, callback) => dispatch(followUser(id, callback)),
  unfollow: (id, callback) => dispatch(unfollowUser(id, callback)),
  checkFollow: (id, callback) => dispatch(checkFollow(id, callback)),
  loadProfileStream: (tab, id) => dispatch(loadProfileStream(tab, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabs);
