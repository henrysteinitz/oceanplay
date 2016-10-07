import React from 'react';

class ProfilePanel extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-panel">
        <div className='panel-shade'></div>
        <img className='panel-pic' src="test-panel.jpg" />
        {/* <div className="profile-pic-container">
          <img className="profile-pic" src="test_prof.jpg" />
        </div> */}
        <div className="display-name">
          Artist Name
        </div>
        <button className="panel-play-button">Play</button>
        <button className="panel-follow-button">Follow</button>
      </div>
    );
  }
}

export default ProfilePanel;
