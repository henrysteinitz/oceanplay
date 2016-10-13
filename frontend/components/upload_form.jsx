import React from 'react';
import { uploadTrack, receiveTrackForStream } from '../actions/track_actions';

class UploadForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      artUrl: '',
      fileUploaded: false,
      artUploaded: false,
      title: "",
      description: "",
      audioFile: null,
      artFile: null
    };

    this._handleUpload = this._handleUpload.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._handleAudio = this._handleAudio.bind(this);
    this._handleArt = this._handleArt.bind(this);
    this._showTrackInfo = this._showTrackInfo.bind(this);
    this._fadeOut = this._fadeOut.bind(this);
    this._fadeIn = this._fadeIn.bind(this);
  }

  _handleInput(type){
    return (e) => this.setState({[type]: e.currentTarget.value});
  }

  _handleAudio(e){
    if (!this.state.fileUploaded){
      if (e.currentTarget.files.length > 0){
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        $(e.currentTarget).prop('disabled', true);
        this.setState({
          audioFile: file,
          fileUploaded: true
        });
        this._showTrackInfo();
      }
    }
  }

  _handleArt(e){
    if (e.currentTarget.files.length > 0){
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      //const preview = this.refs.artPreview;

      reader.addEventListener('loadend', () => {
        this.setState({artUrl: reader.result})
      });

      this.setState({
        artFile: file,
        artUploaded: true
      });

      if (file){
        reader.readAsDataURL(file);
      }
    }
  }

  _handleUpload(){
    if (this.state.fileUploaded){
      const trackData = new FormData();
      trackData.append("track[title]", this.state.title);
      trackData.append("track[description]", this.state.description);
      trackData.append("track[artist_id]", this.props.currentUser.id);
      trackData.append("track[audio]", this.state.audioFile);
      trackData.append("track[art]", this.state.artFile);
      this.props.uploadTrack(trackData, (res) => {
        this.props.returnUploadForm();
        this._fadeIn();
        this._resetForm();
        if (this.props.streamKind === 'recent' ||
          (this.props.streamKind === 'tracks' &&
            this.props.profile.user.id === this.props.currentUser.id)){
              this.props.receiveTrack(res.track);
        }

      });
      this._fadeOut()
      //this.setState()
    }
  }

  _showTrackInfo(){
    $(this.refs.lower).animate({height: "30%"}, 300);
    $(this.refs.upper).animate({height: "70%"}, 300);
  }

  _fadeOut(){
    $(this.refs.lower).animate({opacity: ".2"}, 300);
    $(this.refs.upper).animate({opacity: ".2"}, 300);
    $(this.refs.loadingIcon).animate({opacity: "1.0"}, 300);
  }

  _fadeIn(){
    $(this.refs.lower).animate({opacity: "1.0"}, 300);
    $(this.refs.upper).animate({opacity: "1.0"}, 300);
    $(this.refs.loadingIcon).animate({opacity: "0.0"}, 300);
  }

  _resetForm(){
    $(this.refs.lower).animate({height: "100%"}, 300);
    $(this.refs.upper).animate({height: "0%"}, 300);
    this.setState({fileUploaded: false, artUploaded: false, artUrl: ""});
    $(this.refs.uploadButton).prop('disabled', false);
  }

  render(){
    return (
      <div className='upload-container'>
        <div className='upload-background'
          ref="uploadBackground"
          onClick={this.props.returnUploadForm}>
        </div>
        <div className="upload-sheet" ref='uploadSheet'>
          <img className="upload-loading-icon"
            src="loading.gif"
            ref="loadingIcon" />
          <div className="upload-form-upper" ref="upper">
            <label className='art-preview-container'>
              <img src={this.state.artUrl} ref="artPreview" />
              <input type="file"
                className="none"
                ref="artUploadButton"
                onChange={this._handleArt}>
              </input>
            </label>
            <span className='info-container'>
              <input type="text"
                className="standard-input"
                placeholder="Title"
                onChange={this._handleInput("title")}>
              </input><br/>
              <textarea
                className="standard-input"
                rows="6"
                placeholder="Description"
                onChange={this._handleInput("description")}>
              </textarea>
            </span>
          </div>
          <div className="upload-form-lower" ref="lower">
            <label className='full-width center-text'>
              <input type='file'
                className='none'
                ref='uploadButton'
                onChange={this._handleAudio}/>
              <div className="upload-button"
                onClick={this._handleUpload}>Upload Track
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }

}

export default UploadForm;
