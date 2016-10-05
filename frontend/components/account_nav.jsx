import React from 'react';

class AccountNav extends React.Component{
    constructor(props){
      super(props);
    }

    render(){
      return (
        <div className="account-nav-container">
          <nav className="account-nav">
            <img src='test_prof.jpg'></img>
          </nav>
        </div>
      );
    }
}

export default AccountNav;
