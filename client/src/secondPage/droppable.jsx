import React from "react";
import PropTypes from "prop-types";
import {message} from "antd";

const newStyle = {
  verticalAlign: "middle",
  justifyContent: "center",
  whiteSpace: "normal",
  backgroundColor: "white",
  height: "90%",
  width:"100%"
};

export default class Droppable extends React.Component {
  drop = e => {
    e.preventDefault();
    if (this.props.isDroppable) {
      const data = e.dataTransfer.getData("transfer");
      let child = document.getElementById(data); 

       //if drag into the dustbin
      if (this.props.id==="dustDroppable"){
        //additional mod -> 1. delete
        if(child.getAttribute("name")==="additional"){
          const parent = child.parentElement;
          parent.removeChild(child);
          const parentid = parent.id;
          //2. minus 1
          if(parentid!=="dust"&&parentid!=="SearchBarContainer"&&parentid!=="SideBarContainer"){
            document.getElementById(`${parentid}button`).innerText--;
            document.getElementById('totalmc').innerText--;
          }
        }else{
          message.warning(`${data} cannot be deleted`);
        }  
      }

      if(this.props.id==="SearchBar"){
        if(child.getAttribute("name")==="additional"){
          e.target.appendChild(child);
        }
      }

      if(this.props.id==="SideBar"){
        if(child.getAttribute("name")==="firstMajor"){
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
        style={newStyle}
      >
        <p className="text-center">
          {this.props.heading}
        </p>
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
