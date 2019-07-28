import React from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import storage from "./storage";

export default class Droppable extends React.Component {
  drop = e => {
    e.preventDefault();
    if (this.props.isDroppable) {
      const data = e.dataTransfer.getData("transfer");
      let child = document.getElementById(data);
      //if drag into the dustbin
      if (this.props.id === "dustDroppable") {
        //additional mod -> 1. delete
        if (child.getAttribute("name") === "additional") {
          const parent = child.parentElement;
          console.log(parent);
          parent.removeChild(child);
          console.log(parent);
          const parentid = parent.id;
          storage.deleteMod(this.props.adyear, this.props.major, parent.id, child.lastChild.id);
          const mc = parseInt(child.lastChild.getAttribute("mc"));
          if (
            parentid !== "dust" &&
            parentid !== "SearchBarContainer" &&
            parentid !== "SideBarContainer"
          ) {
            document.getElementById(`${parentid}button`).innerText-=mc;
            storage.changeMc(this.props.adyear, this.props.major, `${parentid}button`, -mc);
            document.getElementById("totalmc").innerText-=mc;
            storage.changeTotalMc(this.props.adyear, this.props.major, -mc);
          }
        } else {
          message.warning(`${child.lastChild.id} cannot be deleted`);
        }
      }

      if (this.props.id === "SearchBar") {
        if (child.getAttribute("name") === "additional") {
          e.target.appendChild(child);
        }
      }

      if (this.props.id === "SideBar") {
        if (child.getAttribute("name") === "firstMajor") {
          e.target.appendChild(child);
        }
      }
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
      >
        {this.props.children}
      </div>
    );
  }
}

Droppable.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  isDroppable: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
};
