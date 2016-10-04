import React from 'react';
import MenuBar from './menu_bar';
import Stream from './stream';

const App = (props) => (
  <div id='app'>
    <MenuBar />
    {props.children}
  </div>
);

export default App;
