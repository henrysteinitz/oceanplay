import React from 'react';
import Logo from './logo';
import AccountNav from './account_nav';
import { Link } from 'react-router';

class MenuBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="menu-bar">
        <Logo type="menu"/>
        <nav className="left-menu">
          <Link to={"/stream"} className="link">stream</Link>
          <Link to={"/library"} className="link">library</Link>
        </nav>
        <nav className="right-menu">
          <AccountNav />
          <Link to={"/upload"}  className="link">upload</Link>
        </nav>
      </nav>
    )
  }
}

export default MenuBar;
