import React from 'react';

class UploadForm extends React.Component{

  constructor(props){
    super(props);
    this.state = { artUrl : 'test-art.jpg' };

    this._handleAudio = this._handleAudio.bind(this);
    this._handleArt = this._handleArt.bind(this);
    this._showTrackInfo = this._showTrackInfo.bind(this);
  }

  _handleAudio(e){
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    this.setState({ audioFile: file });
    this._showTrackInfo();
  }

  _handleArt(e){

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
            <span className='art-container'>
              <img src={this.state.artUrl} />
            </span>
            <span className='info-container'>
              <input type="text"
                className="standard-input"
                placeholder="Title"></input><br/>
              <textarea
                className="standard-input"
                rows="6"
                placeholder="Description">
              </textarea>
            </span>
          </div>
          <div className="upload-form-lower" ref="lower">
            <label className='full-width center-text'>
              <div className="upload-button">Upload Track</div>
              <input type='file'
                className='none'
                ref='uploadButton'
                onChange={this._handleAudio}/>
            </label>
          </div>
        </div>
      </div>
    );
  }

}

export default UploadForm;
