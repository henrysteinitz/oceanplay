import React from 'react';
import Logo from './logo';

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: 'signin'
    };
  }

  _handleSwitch(type){
    this.setState({type});
  }

  render(){
    let retype = "";
    let buttonText = 'Sign In';
    if (this.state.type === 'signup'){
      retype = <input type="password" placeholder="Retype Password"/>
      buttonText = 'Sign Up';
    }

    return (
      <div className='signin-background'>
        <div className='signin'>
          <div className='logo-container'>
            <Logo type='signin'/>
            <div className="logo-text bold">ocean</div>
            <div className="logo-text">play</div>
          </div>
          <div className="formSwitcher">
            <a onClick={this._handleSwitch.bind(this, 'signin')}>Sign In</a>
              or
            <a onClick={this._handleSwitch.bind(this, 'signup')}>Sign Up</a>
          </div>
          <form className='signup-form'>
            <span>
            <input type="text" placeholder="Username"/><br />
            <input type="password" placeholder="Password"/><br />
            {retype}
            </span>
            <span className="signin-button-container">
              <button> {buttonText} </button>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
