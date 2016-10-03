import React from 'react';
import Logo from './logo';

class MenuBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="menu-bar">
        <Logo />
        <nav className="left-menu">
          <a>stream</a>
          <a>library</a>
        </nav>
        <nav className="right-menu">
          <a>upload</a>
        </nav>
      </nav>
    )
  }
}

export default MenuBar;