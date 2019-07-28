import React, { Component } from "react";
import PropTypes from "prop-types";

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    index: PropTypes.number
  };
  showDetails() {
    if (this.props.comment.course === "") {
      return "";
    } else {
      return (
        "(" + this.props.comment.course + "  " + this.props.comment.year + ")"
      );
    }
  }
  render() {
    const { comment } = this.props;
    return (
      <div
        className="wrapper"
        style={{ marginTop: "0px", marginBottom: "0px" }}
      >
        <div
          style={{
            marginBottom: "10px"
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              color: "rgb(50, 89, 128)",
              display: "inline-block",
              marginRight: "10px",
              marginBottom: "10px"
            }}
          >
            {comment.username}
          </span>
          <span style={{ fontStyle: "italic", color: "#9e9e9e" }}>
            {this.showDetails()}
          </span>
          <p style={{ fontWeight: "normal" }}>{comment.comment}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
