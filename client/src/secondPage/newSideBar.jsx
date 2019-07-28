import React, { Component } from "react";
import Draggable from "../component/draggable";
import Droppable from "../component/droppable";
import Mod from "../component/mod";
import storage from "../component/storage";
import "../style/sidebar.less";
import { Typography } from "antd";

const { Title } = Typography;
class NSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { draggables: [] };
  }

  componentWillMount() {
    const { adyear, major, init } = this.props;
    let draggables = [];
    if (init) {
      let p = `../data/programmes/${adyear.substring(0, 6)}/${major}.json`;
      fetch(p)
        .then(res => res.json())
        .then(data => {
          let store = [];
          for (var m in data) {
            draggables.push([m, "rgb(84,169,139)", "firstMajor"]);
            store.push([m, "rgb(84,169,139)", "firstMajor"]);
          }
          storage.init(adyear, major, store);
          this.setState({ draggables: draggables });
        });
    } else {
      let storeSideBar = storage.getYMCol(adyear, major, "SideBarContainer");
      for (var m of storeSideBar) {
        draggables.push(m);
      }
      this.setState({ draggables: draggables });
    }
  }

  render() {
    return (
      <div className="sidebar">
        <Title className="title">First-major modules</Title>
        <Droppable id="SideBar" isDroppable={true}>
          <div id="SideBarContainer">
            {this.state.draggables.map(mod => (
              <Draggable
                className="list-inline-item"
                id={`${mod[0]}Draggable`}
                key={mod[0]}
                name={mod[2]}
                adyear={this.props.adyear}
                major={this.props.major}
                parent="SideBarContainer"
              >
                <Mod
                  id={mod[0]}
                  key={mod[0]}
                  code={mod[0]}
                  name={mod[2]}
                  color={mod[1]}
                />
              </Draggable>
            ))}
          </div>
        </Droppable>
      </div>
    );
  }
}

export default NSideBar;
