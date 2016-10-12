import React from 'react';

class ProfilePanel extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-panel">
        <label className="panel-label">
          <div className='panel-shade'></div>
          <img className='panel-pic' src={this.props.panelUrl} />
          <input type='file'
            className='none'
            onChange={this.props.handlePanel}
            ref='input'
            disabled/>
          <div className="panel-row">

            <div className="display-name">
              {this.props.displayName}
            </div>
          </div>
        </label>

      </div>
    );
  }
}

export default ProfilePanel;
