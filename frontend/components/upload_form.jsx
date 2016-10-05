import React from 'react';

class UploadForm extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="upload-form-container">
        <button className="upload-button">Upload Track</button>
      </div>
    );
  }

}

export default UploadForm;
