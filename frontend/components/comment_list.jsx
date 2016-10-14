import React from 'react';
import Comment from './comment';

class CommentList extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    let comments;
    if (this.props.comments){
      comments = this.props.comments.map((comment) => (
        <Comment comment={comment} key={comment.id}/>
      ));
    }


    return (
      <div className="comments-container bottom-padding">
        {comments}
      </div>
    );
  }

}

import { connect } from 'react-redux';

const mapStateToProps = ({ track }) => ({
  comments: track.comments
});

export default connect(mapStateToProps, null)(CommentList);
