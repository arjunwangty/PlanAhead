import React from "react";
import PropTypes from "prop-types";
import storage from "../component/storage";
import Draggable from "../component/draggable";
import Mod from "../component/mod";

const newStyle = {
  verticalAlign: "middle",
  justifyContent: "center",
  whiteSpace: "normal",
  backgroundColor: "rgba(0,0,0,0)",
  height: "360px",
  textAlign: "center",
  paddingLeft: "12px"
};
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
    const { adyear, major } = this.props;
    let mods = storage.getYM(adyear, major)[this.props.id];
    return (
      <div
        id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        style={newStyle}
      >
        {mods.map(mod => (
          <Draggable
            className="list-inline-item"
            id={`${mod[0]}Draggable`}
            parent={this.props.id}
            name={mod[2]}
            adyear={this.props.adyear}
            major={this.props.major}
          >
            <Mod id={mod[0]} code={mod[0]} color={mod[1]} name={mod[2]} />
          </Draggable>
        ))}
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
