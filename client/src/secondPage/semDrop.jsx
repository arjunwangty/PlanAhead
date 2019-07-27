import React from "react";
import PropTypes from "prop-types";

export default class SemDrop extends React.Component {

  drop = e => {
    e.preventDefault();
    if (this.props.isDroppable) {
      const data = e.dataTransfer.getData("transfer");
      e.target.appendChild(document.getElementById(data));
    }
  };

  allowDrop = e => {
    e.preventDefault();
  };


  render() {
    return (
      <div
      id={this.props.id}
      onDrop={this.drop}
      onDragOver={this.allowDrop}
      style={this.props.style}
    >
    </div>
    );
  }
}

SemDrop.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  isDroppable: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
};
