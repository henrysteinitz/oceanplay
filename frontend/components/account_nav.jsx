import React from 'react';
import { hashHistory, Link } from 'react-router';

class AccountNav extends React.Component{
    constructor(props){
      super(props);
      this.state = {locked: false}

      this._signout = this._signout.bind(this);
    }

    _signout(){
      this.props.signout(() => {
        hashHistory.push('/signin');
        this.props.clearNowPlaying();
      });
    }

    componentDidMount(){
      $(this.refs.container).hover( (e) => {
        if (!this.state.locked){
          this.setState({locked: true})
          $(this.refs.dropdown).slideDown("fast");
        }
      }, (e) => {
        if (this.state.locked){
          $(this.refs.dropdown).slideUp("fast", () => this.setState({locked: false}));
        }
      });
    }


    render(){
      let profileLink;
      if (this.props.user){
        profileLink = `/profile/${this.props.user.id}`;
      } else {
        profileLink = '';
      }
      return (
        <div className="account-nav-container" ref="container">
          <nav className="account-nav">
            <img src='test_prof.jpg'></img>
          </nav>
          <div className="account-dropdown" ref="dropdown">
            <Link to={profileLink} className='dropdown-link link'>Profile</Link>
            <Link onClick={this._signout} className='dropdown-link link'>Sign Out</Link>
          </div>
        </div>
      );
    }
}

import { connect } from 'react-redux';
import { signout } from '../actions/session_actions';
import { clearNowPlaying } from '../actions/track_actions';

const mapStateToProps = ({ session }) => ({
  user: session.user,
  clearNowPlaying: () => dispatch(clearNowPlaying())
});

const mapDispatchToProps = (dispatch) => ({
  signout: (callback) => dispatch(signout(callback)),
  clearNowPlaying: () => dispatch(clearNowPlaying())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountNav);
