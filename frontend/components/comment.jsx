import React from 'react';

class Comment extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="comment">
        <img src={this.props.comment.profpic_url} className="comment-icon" />
        <p className="">{this.props.comment.body}</p>
      </div>
    );
  }
}

export default Comment;
