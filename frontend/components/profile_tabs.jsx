import React from 'react';

class ProfileTabs extends React.Component{
  constructor(props){
    super(props)

    props.checkFollow(props.userId);
    this._follow = this._follow.bind(this);
  }

  _follow(){
    if (this.props.following){
      this.props.unfollow(this.props.userId, (r) => console.log(r));
    } else {
      this.props.follow(this.props.userId, (r) => console.log(r));
    }
  }

  render(){
    let followButtonClass;
    let followButtonText;
    if (this.props.following){
      followButtonClass = "panel-follow-button following"
      followButtonText = "Following"
    } else {
      followButtonClass = "panel-follow-button not-following"
      followButtonText = "Follow"
    }

    return (
      <div className="tabs">
        <span className="tab selected-tab">
          All
        </span>
        <span className="tab">
          Tracks
        </span>
        <span className="tab">
          Playlists
        </span>
        <span className="tab">
          Reposts
        </span>

        <button className={followButtonClass}
          onClick={this._follow}>{followButtonText}</button>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { followUser, unfollowUser, checkFollow } from '../actions/profile_actions';

const mapStateToProps = ({ profile }) => ({
  following: profile.following
})

const mapDispatchToProps = (dispatch) => ({
  follow: (id, callback) => dispatch(followUser(id, callback)),
  unfollow: (id, callback) => dispatch(unfollowUser(id, callback)),
  checkFollow: (id, callback) => dispatch(checkFollow(id, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabs);
