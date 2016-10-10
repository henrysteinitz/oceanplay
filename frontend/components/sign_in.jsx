import React from 'react';
import Logo from './logo';
import ReactVideo from 'react.video'
import merge from 'lodash/merge';
import { hashHistory } from 'react-router';

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: 'signin',
      inputs: {
        username: "",
        password: "",
        retypedPass: ""
      }
    };
    //bind methods
    this._updateInput = this._updateInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _updateInput(field){
    return (e) => {
      const newInputs = merge(
        {},
        this.state.inputs,
        {[field]: e.currentTarget.value}
      );
      this.setState({inputs: newInputs});
    };
  }

  _handleSwitch(type){
    this.setState({type});
  }

  _handleSubmit(e){
    e.preventDefault();
    const success = (response) => hashHistory.push('/stream');
    if (this.state.type === 'signup'){
      if (this.state.inputs.password === this.state.inputs.retypedPass){
        this.props.signup(
          {
            username: this.state.inputs.username,
            password: this.state.inputs.password
          }, success
        );
      }
    } else {
      this.props.signin(
        {
          username: this.state.inputs.username,
          password: this.state.inputs.password
        }, success
      );
    }
  }

  render(){
    let retype = "";
    let buttonText = 'Sign In';
    if (this.state.type === 'signup'){
      retype = <input type="password"
                  placeholder="Retype Password"
                  className="standard-input"
                  onChange={this._updateInput('retypedPass')}/>
      buttonText = 'Sign Up';
    }

    return (
      <div className='signin-background'>
        <div className='signin'>
          <div className='logo-container'>
            <Logo type='signin'/>
            <div className="logo-text bold">soul</div>
            <div className="logo-text">stream</div>
          </div>
          <div className="formSwitcher">
            <a onClick={this._handleSwitch.bind(this, 'signin')}>Sign In</a>
              or
            <a onClick={this._handleSwitch.bind(this, 'signup')}>Sign Up</a>
          </div>
          <form className='signup-form' onSubmit={this._handleSubmit}>
            <span>
            <input type="text"
              placeholder="Username"
              className="standard-input"
              onChange={this._updateInput('username')}/><br />
            <input type="password"
               placeholder="Password"
               className="standard-input"
               onChange={this._updateInput('password')}/><br />
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

// Container

import { connect } from 'react-redux';
import { signup, signin } from '../actions/session_actions';

const mapDispatchToProps = (dispatch) => ({
  signup: (user, success) => dispatch(signup(user, success)),
  signin: (user, success) => dispatch(signin(user, success))
});

export default connect(null, mapDispatchToProps)(SignIn);
