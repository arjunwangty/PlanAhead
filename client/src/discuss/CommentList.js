import React, { Component } from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  };

  handleDeleteComment(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  static defaultProps = {
    comments: []
  };
  render() {
    if (this.props.comments !== null) {
      return (
        <div>
          {this.props.comments.map(comment => (
            <Comment
              comment={comment}
              key={comment.comment}
              index={comment.index}
            />
          ))}
        </div>
      );
    }
  }
}

export default CommentList;
