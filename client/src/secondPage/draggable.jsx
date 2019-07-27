import React from "react";
import PropTypes from "prop-types";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { parent: null };
  }

  drag = e => {
    e.dataTransfer.setData("transfer", e.target.id);
    this.className = "";
  };

  noAllowDrop = e => {
    e.stopPropagation();
  };



  dragEnd = e => {
    const mc = parseInt(
      document.getElementById(this.props.id).firstChild.getAttribute("mc")
    );
    const initparent = this.state.parent;
    
    if (initparent !== null) {
      document.getElementById(`${this.state.parent}button`).innerText -= mc;
    }

    let currentParent = document.getElementById(e.target.id).parentElement.id;
    if (
      currentParent !== "SearchBarContainer" &&
      currentParent !== "SideBarContainer" &&
      currentParent !== "dust"
    ) {
      this.setState({
        parent: currentParent
      });
      console.log(currentParent);
      document.getElementById(`${currentParent}button`).innerText =
        parseInt(document.getElementById(`${currentParent}button`).innerText) +
        mc;
    } else {
      currentParent = null;
      this.setState({
        parent: null
      });
    }

    if (initparent !== null && currentParent === null) {
      document.getElementById("totalmc").innerText -= mc;
    }

    if (initparent === null && currentParent !== null) {
      document.getElementById("totalmc").innerText =
        parseInt(document.getElementById("totalmc").innerText) + mc;
    }
  };

  render() {
    return (
      <div
        name={this.props.name}
        style={{ margin: "5px" }}
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.noAllowDrop}
        onDragEnd={this.dragEnd}
        value={this.props.value}
        isDroppable={false}
      >
        {this.props.children}
      </div>
    );
  }
}

Draggable.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node
};
