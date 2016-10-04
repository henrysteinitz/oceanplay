import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import Stream from './stream';
import SignIn from './sign_in';

class Root extends React.Component{
  constructor(props){
    super(props);
    this._checkAuth = this._checkAuth.bind(this);
  }

  _checkAuth(){
    if (!this.user){
      console.log('adsf')
      replace('/signin');
      this.forceUpdate();
    }
  }

  render(){
    return (
    <Provider store={this.props.store}>
      <Router history={hashHistory}>
        <Route path="/" onEnter={this._checkAuth} component={App}>
          <Route path="/stream" component={Stream} onEnter={this._checkAuth}/>
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
