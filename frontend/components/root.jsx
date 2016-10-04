import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import Stream from './stream';
import SignIn from './sign_in';

class Root extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
    <Provider store={this.props.store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/stream" component={Stream} />
        </Route>
        <Route path="/signin" component={SignIn} />
      </Router>
    </Provider>
    );
  }
}

export default Root;
