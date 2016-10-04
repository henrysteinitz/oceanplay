import React from 'react';
import Logo from './logo';

class SignIn extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='signin-background'>
        <div className='signin'>
          <div className='logo-container'>
            <Logo type='signin'/>
            <div className="logo-text bold">ocean</div>
            <div className="logo-text">play</div>
          </div>
          <div className="formSwitcher">
            <a>Sign In</a>    or    <a>Sign Up</a>
          </div>
          <form className='signup-form'>
            <span>
            <input type="text" placeholder="Username"/><br />
            <input type="password" placeholder="Password"/><br />
            <input type="password" placeholder="Retype Password"/>
            </span>
            <span className="signin-button-container">
              <button> Sign In </button>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
