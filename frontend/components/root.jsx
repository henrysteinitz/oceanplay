import React from 'react';
import { Provider } from 'react-redux';
import { replace, Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import MainStream from './main_stream';
import Library from './library';
import Profile from './profile';
import UploadForm from './upload_form';
import SignIn from './sign_in';
import TrackPage from './track_page';

class Root extends React.Component{
  constructor(props){
    super(props);
    this._checkAuth = this._checkAuth.bind(this);
    this._hideNowPlaying = this._hideNowPlaying.bind(this);
    this._trackEnter = this._trackEnter.bind(this);
    this._trackLeave = this._trackLeave.bind(this);
  }

  _checkAuth(nextState, replace){
    if (!this.props.user){
      replace('/signin');
    }
  }

  _hideNowPlaying(){
    this.props.hide();
  }

  _trackEnter(props){
    this._checkAuth();
    if (parseInt(props.params.id) === this.props.currentTrackId){
      this._hideNowPlaying();
    }
  }

  _trackLeave(){
    if(this.props.playing){
      this.props.show();
    }
  }

  render(){
    return (
        <Provider store={this.props.store}>
          <Router history={hashHistory}>
            <Route path="/" onEnter={this._checkAuth} component={App}>
              <Route path="/stream" onEnter={this._checkAuth} component={MainStream} />
              <Route path="/library" onEnter={this._checkAuth} component={Library} />
              <Route path="/profile/:id" onEnter={this._checkAuth} component={Profile} />
              <Route path="/track/:id"
                onEnter={this._trackEnter}
                onLeave={this._trackLeave}
                component={TrackPage} />
            </Route>
            <Route path="/signin" component={SignIn} />
          </Router>
        </Provider>
    );
  }
}

import { connect } from 'react-redux';
import { showNowPlaying, hideNowPlaying } from '../actions/track_actions'

const mapStateToProps = ({ session, nowPlaying }) => ({
  user: session.user,
  currentTrackId: nowPlaying.track.id,
  playing: nowPlaying.playing
});

const mapDispatchToProps = (dispatch) => ({
  show: () => dispatch(showNowPlaying()),
  hide: () => dispatch(hideNowPlaying())
})

export default connect(mapStateToProps, mapDispatchToProps)(Root);
