import React from 'react';
import Logo from './logo';
import AccountNav from './account_nav';

class MenuBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="menu-bar">
        <Logo type="menu"/>
        <nav className="left-menu">
          <a>stream</a>
          <a>library</a>
        </nav>
        <nav className="right-menu">
          <AccountNav />
          <a>upload</a>
        </nav>
      </nav>
    )
  }
}

export default MenuBar;
