import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root'
import configureStore from './store/store';


document.addEventListener("DOMContentLoaded", () => {
  let preloadedState;
  if (window.currentUser) {
    preloadedState = { session: { user: window.currentUser } };
  } else {
    preloadedState = {};
  }
  preloadedState.stream = {
    tracks: [],
    nowPlaying: {playing: false}
  };
  preloadedState.profile = {
    following: false
  };

  preloadedState.retracks = {};

  const store = configureStore(preloadedState);
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
