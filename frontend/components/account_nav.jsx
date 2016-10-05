import React from 'react';
import { hashHistory, Link } from 'react-router';

class AccountNav extends React.Component{
    constructor(props){
      super(props);
      this._signout = this._signout.bind(this);
    }

    _signout(){
      this.props.signout(() => {
        hashHistory.push('/signin');
      });
    }

    componentDidMount(){
      $(this.refs.container).hover( (e) => {
        $(this.refs.dropdown).slideDown("fast");
      }, (e) => {
        $(this.refs.dropdown).slideUp("fast");
      });
    }


    render(){
      return (
        <div className="account-nav-container" ref="container">
          <nav className="account-nav">
            <img src='test_prof.jpg'></img>
          </nav>
          <div className="account-dropdown" ref="dropdown">
            <Link onClick={this._signout} className='dropdown-link link'>Sign Out</Link>
          </div>
        </div>
      );
    }
}

import { connect } from 'react-redux';
import { signout } from '../actions/session_actions'

const mapDispatchToProps = (dispatch) => ({
  signout: (callback) => dispatch(signout(callback))
});

export default connect(null, mapDispatchToProps)(AccountNav);
