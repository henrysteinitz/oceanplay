import React from 'react';
import Stream from './stream';
import ProfilePanel from './profile_panel';
import ProfileTabs from  './profile_tabs';
import merge from 'lodash/merge';
//import Stats from './stats';

class Profile extends React.Component{

  constructor(props){
    super(props)


    this.props.clearStream();
    this.props.loadProfile(this.props.params.id);
    this.state = {
      editing: false,
      updateData: {}
    };

    this._handleProf = this._handleProf.bind(this);
    this._handlePanel = this._handlePanel.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._edit = this._edit.bind(this);
    this._save = this._save.bind(this);
    this._autoResize = this._autoResize.bind(this);
  }

  _handleProf(e){
    if (e.currentTarget.files.length > 0){
      const reader = new FileReader();
      const file = e.currentTarget.files[0];

      reader.addEventListener('loadend', () => {
        this.setState({profUrl: reader.result})
      });

      this.setState({
        uploadData: merge(this.state.updateData, {profpic: file})
      });

      if (file){
        reader.readAsDataURL(file);
      }
    }
  }

  _handlePanel(e){
    if (e.currentTarget.files.length > 0){
      const reader = new FileReader();
      const file = e.currentTarget.files[0];

      reader.addEventListener('loadend', () => {
        this.setState({panelUrl: reader.result})
      });

      this.setState({
        uploadData: merge(this.state.updateData, {panelpic: file})
      });

      if (file){
        reader.readAsDataURL(file);
      }
    }
  }

  _handleClick(){
    if (this.state.editing){
      this._save();
    } else {
      this._edit();
    }
  }


  _edit(){
    this.setState({editing: true}, () => {
      $(this.refs.panel.refs.input).prop('disabled', false);
      $(this.refs.profpicInput).prop('disabled', false);
    });
  }

  _save(){
    this.setState({editing: false}, () => {
      $(this.refs.panel.refs.input).prop('disabled', true);
      $(this.refs.profpicInput).prop('disabled', true);

      const data = new FormData();
      if (this.state.updateData.panelpic){
        data.append('user[panelpic]', this.state.updateData.panelpic);
      }
      if (this.state.updateData.profpic){
        data.append('user[profpic]', this.state.updateData.profpic);
      }
      this.props.updateProfile(this.props.params.id, data);
    });
  }

  _autoResize(){
    if (this.refs.profpic.naturalWidth > this.refs.profpic.naturalHeight){
      $(this.refs.profpic).height('100%');
      $(this.refs.profpic).width('auto');
    } else {
      $(this.refs.profpic).height('auto');
      $(this.refs.profpic).width('100%');
    }
  }

  componentWillUnmount(){
    this.props.clearUser();
  }

  componentWillReceiveProps(nextProps){
    this.props.clearUser();
    if (nextProps.params.id !== this.props.params.id){
      this.props.loadProfile(nextProps.params.id);
    }
  }

  render(){
    let displayName = "";
    if (this.props.profile.user){
      displayName = this.props.profile.user.username;
    }

    let panelUrl = "";
    if (this.state.panelUrl){
      panelUrl = this.state.panelUrl;
    } else {
      if (this.props.profile.user){
        panelUrl = this.props.profile.user.panelUrl;
      }
    }

    let profUrl = "";
    if (this.state.profUrl){
      profUrl = this.state.profUrl;
    } else {
      if (this.props.profile.user){
        profUrl = this.props.profile.user.profUrl;
      }
    }

    let followers = [];
    if (this.props.profile.user){
      followers = this.props.profile.user.followers;
    }

    let following = [];
    if (this.props.profile.user){
      following = this.props.profile.user.following;
    }

    return (
      <main>
        <ProfilePanel
          displayName={displayName}
          handlePanel={this._handlePanel}
          ref='panel'
          panelUrl={panelUrl}/>
        <ProfileTabs
          userId={parseInt(this.props.params.id)}
          editing={this.state.editing}
          handleClick={this._handleClick} />
        <div className='profile-stream-container'>
          <Stream tracks={this.props.stream.tracks} />
        </div>
        <div className="artist-info">
          <div className="artist-profpic-container">
            <label>
              <img ref='profpic'
                src={profUrl}
                className="artist-profpic"
                onLoad={this._autoResize} />
              <input type="file"
                className="none"
                ref="profpicInput"
                onChange={this._handleProf}
                disabled />
            </label>
          </div>
          <div className="artist-info-right">
            <div className="artist-name-small">
              {displayName}
            </div>
            <div className="following-info">
              followers:
              <span className="follow-bold">
              {followers.length}
              </span>
              following:
              <span className="follow-bold">
              {following.length}
              </span>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

// Redux Container
import { connect } from 'react-redux';
import { loadProfile, updateProfile, clearUser } from '../actions/profile_actions'
import { clearStream } from '../actions/stream_actions'

const mapStateToProps = ({ stream, profile }) => ({
  stream,
  profile
})

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (id, data) => dispatch(updateProfile(id, data)),
  loadProfile: (id) => dispatch(loadProfile(id)),
  clearStream: () => dispatch(clearStream()),
  clearUser: () => dispatch(clearUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
