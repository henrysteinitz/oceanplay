import React from 'react';
import { Provider } from 'react-redux';
import { replace, Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import Stream from './stream';
import Library from './library';
import UploadForm from './upload_form';
import SignIn from './sign_in';

class Root extends React.Component{
  constructor(props){
    super(props);
    this._checkAuth = this._checkAuth.bind(this);
  }

  _checkAuth(nextState, replace){
    if (!this.props.user){
      replace('/signin');
    }
  }

  render(){
    return (
    <Provider store={this.props.store}>
      <Router history={hashHistory}>
        <Route path="/" onEnter={this._checkAuth} component={App}>
          <Route path="/stream" onEnter={this._checkAuth} component={Stream} />
          <Route path="/library" onEnter={this._checkAuth} component={Library} />
          <Route path="/upload" onEnter={this._checkAuth} component={UploadForm} />
        </Route>
        <Route path="/signin" component={SignIn} />
      </Router>
    </Provider>
    );
  }
}

import { connect } from 'react-redux';

const mapStateToProps = ({session}) => ({
  user: session.user
});

export default connect(mapStateToProps, null)(Root);
