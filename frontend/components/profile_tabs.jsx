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


        <button className={buttonClass}
          onClick={buttonClick}>{buttonText}</button>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { followUser, unfollowUser, checkFollow } from '../actions/profile_actions';

const mapStateToProps = ({ profile, session }) => ({
  following: profile.following,
  session
})

const mapDispatchToProps = (dispatch) => ({
  follow: (id, callback) => dispatch(followUser(id, callback)),
  unfollow: (id, callback) => dispatch(unfollowUser(id, callback)),
  checkFollow: (id, callback) => dispatch(checkFollow(id, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabs);
