import React from 'react';

class ProfileTabs extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="profile-tabs">
        <span className="profile-tab selected-tab">
          All
        </span>
        <span className="profile-tab">
          Tracks
        </span>
        <span className="profile-tab">
          Playlists
        </span>
        <span className="profile-tab">
          Reposts
        </span>
      </div>
    );
  }
}

export default ProfileTabs;
