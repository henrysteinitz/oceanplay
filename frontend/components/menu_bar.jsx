import React from 'react';
import Logo from './logo';
import AccountNav from './account_nav';
import UploadForm from './upload_form';
import { Link } from 'react-router';

class MenuBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {hidden: true, locked: false};

    this._releaseUploadForm = this._releaseUploadForm.bind(this);
    this._returnUploadForm = this._returnUploadForm.bind(this);
    this._toggleUploadForm = this._toggleUploadForm.bind(this);
  }

  _toggleUploadForm(){
    if (!this.state.locked) {
      if (this.state.hidden) {
        this._releaseUploadForm();
      } else {
        this._returnUploadForm();
      }
    }
  }

  _releaseUploadForm(){
    if (!this.state.locked && this.state.hidden){
      this.setState({locked: true});
      $(this.refs.uploadForm.refs.uploadSheet).addClass('animated fadeInDown');
      $(this.refs.uploadForm.refs.uploadSheet).css('visibility', 'visible');
      $(this.refs.uploadForm.refs.uploadBackground).addClass('animated fadeIn');
      $(this.refs.uploadForm.refs.uploadBackground).css('visibility', 'visible');

      setTimeout(() => {
        $(this.refs.uploadForm.refs.uploadSheet).removeClass('animated fadeInDown');
        $(this.refs.uploadForm.refs.uploadBackground).removeClass('animated fadeIn');
        this.setState({hidden: false, locked: false});
      }, 570);
    }
  }

  _returnUploadForm(){
    if (!this.state.locked && !this.state.hidden){
      this.setState({locked: true});
      $(this.refs.uploadForm.refs.uploadSheet).addClass('animated fadeOutUp');
      $(this.refs.uploadForm.refs.uploadBackground).addClass('animated fadeOut');

      setTimeout(() => {
        this.setState({hidden: true, locked:false});
        $(this.refs.uploadForm.refs.uploadSheet).css('visibility', 'hidden');
        $(this.refs.uploadForm.refs.uploadSheet).removeClass('animated fadeOutUp');
        $(this.refs.uploadForm.refs.uploadBackground).css('visibility', 'hidden');
        $(this.refs.uploadForm.refs.uploadBackground).removeClass('animated fadeOut');
      }, 570);
    }
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className='menu-bar-wrapper'>
        <nav className="menu-bar" onClick={this._returnUploadForm}>
          <Logo type="menu"/>
          <nav className="left-menu">
            <Link to={"/stream"} className="link">stream</Link>
            <Link to={"/library"} className="link">library</Link>
          </nav>
          <nav className="right-menu">
            <AccountNav />
            <Link className="link" onClick={this._releaseUploadForm}>upload</Link>
          </nav>
        </nav>
        <UploadForm ref='uploadForm' returnUploadForm={this._returnUploadForm}/>
      </div>
    );
  }
}

export default MenuBar;
