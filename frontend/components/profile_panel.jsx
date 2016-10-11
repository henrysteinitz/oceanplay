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

        <div className="panel-row">

          <div className="display-name">
            {this.props.displayName}
          </div>

        </div>
      </div>
    );
  }
}

export default ProfilePanel;
