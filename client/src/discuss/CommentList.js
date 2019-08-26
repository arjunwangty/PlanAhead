import React, { Component } from "react";
import { Spin } from "antd";
import Comment from "./Comment";
import PropTypes from "prop-types";
import "./discuss.css";

class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }
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
      if (this.state.isLoading) {
        return (
          <div className="wrapper" style={{ textAlign: "center" }}>
            <Spin />
          </div>
        );
      } else {
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
}

export default CommentList;
