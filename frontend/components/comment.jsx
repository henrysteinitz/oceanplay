import React from 'react';

class Comment extends React.Component{

  constructor(props){
    super(props);

    this._autoResize = this._autoResize.bind(this);
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

  render(){
    return (
      <div className="comment">
        <div className = "comment-icon">
          <img src={this.props.comment.profpic_url}
            ref="profpic"
            onLoad={this._autoResize}/>
        </div>

        <p className="">{this.props.comment.body}</p>
      </div>
    );
  }
}

export default Comment;
