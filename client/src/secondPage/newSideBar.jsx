import React, { Component } from "react";
import Draggable from "./draggable";
import Droppable from "./droppable";
import Mod from "./mod";

const wrapperStyle2 = {
  padding: "2px",
  display: "inline-block",
  backgroundColor: "white",
  border: "1px solid #C8C8C8",
  borderRadius: "3px",
  textAlign: "left",
  width: "100%",
  height: "200px",
  overflowX: "scroll"
};

class NSideBar extends Component {
  constructor(props) {
    super(props);
    const { adyear, major } = this.props;
    this.state = {
      draggables: []
    };
    let p = `../data/programmes/${adyear.substring(0, 6)}/${major}.json`;
    fetch(p)
      .then(res => res.json())
      .then(data => {
        let moduleArray = [];
        for (var m in data) {
          moduleArray.push({
            id: m,
            code: m,
            title: data[m]
          });
        }
        this.setState({ draggables: moduleArray });
      });
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgb(84,169,139)",
          marginTop: "10px",
          borderRadius: "4px",
          width: "270px",
          height: "300px"
        }}
      >
        <p style={{ color: "white", fontSize: "20px", paddingTop: "5%" }}>
          First-major modules
        </p>
        <Droppable id="SideBar" isDroppable={true} heading="">
          <div
            className="list-inline"
            id="SideBarContainer"
            style={wrapperStyle2}
          >
            {this.state.draggables.map(mod => (
              <Draggable
                className="list-inline-item"
                id={`${mod.id}Draggable`}
                key={mod.id}
                name="firstMajor"
              >
                <Mod id={mod.id} code={mod.code} name="firstMajor" />
              </Draggable>
            ))}
          </div>
        </Droppable>
      </div>
    );
  }
}

export default NSideBar;
