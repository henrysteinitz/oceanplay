import React from 'react';

class UploadForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      artUrl: '',
      fileUploaded: false,
      artUpladed: false,
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
  }

  _handleInput(type){
    console.log(this.state);
    return (e) => this.setState({[type]: e.currentTarget.value});
  }

  _handleAudio(e){
    if (!this.state.fileUploaded){
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

  _handleArt(e){
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    console.log('asdfasdf');
    //const preview = this.refs.artPreview;

    reader.addEventListener('loadend', () => {
      this.setState({artUrl: reader.result})
    });

    this.setState({
      artFile: file,
      artUploaded: true
    })

    if (file){
      reader.readAsDataURL(file);
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
      this.props.uploadTrack(
        trackData,
        (r) => console.log(r)
      );
      //this.setState()
    }
  }

  _showTrackInfo(){
    $(this.refs.lower).animate({height: "30%"}, 300);
    $(this.refs.upper).animate({height: "70%"}, 300);
  }

  render(){
    return (
      <div className='upload-container'>
        <div className='upload-background'
          ref="uploadBackground"
          onClick={this.props.returnUploadForm}>
        </div>
        <div className="upload-sheet" ref='uploadSheet'>
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
