import React, { Component } from "react";
import Droppable from "../component/droppable";
import Draggable from "../component/draggable";
import Mod from "../component/mod";
import { Input, Button, message } from "antd";
import storage from "../component/storage";
import "../style/searchbar.less";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    const { adyear, major } = this.props;
    let searchbar = storage.getYMCol(adyear, major, "SearchBarContainer");
    let exist = [];
    for (let i of searchbar) {
      exist.push(i);
    }
    this.state = {
      inputValue: "",
      draggables: exist,
      click: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  render() {
    return (
      <div className="searchbar">
        <div className="input">
          <Input
            placeholder="Search for a module"
            id="insertion"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            autoComplete="off"
          />
          <Button onClick={this.handleBtnClick}>Go</Button>
        </div>
        <div>
          <Droppable id="SearchBar" isDroppable={true}>
            <div id="SearchBarContainer">
              {this.state.draggables.map(mod => (
                <Draggable
                  className="list-inline-item"
                  parent="SearchBarContainer"
                  id={`${mod[0]}Draggable`}
                  key={`${mod[0]}Draggable`}
                  name={mod[2]}
                  adyear={this.props.adyear}
                  major={this.props.major}
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
      </div>
    );
  }

  handleInputChange(e) {
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }));
  }

  handleBtnClick() {
    const inputcode = this.state.inputValue.toUpperCase();
    let allModules = document.getElementsByTagName("button");
    for (let i = 0; i < allModules.length; i++) {
      if (allModules[i].getAttribute("id") === inputcode) {
        alert(`${inputcode} already exists!`);
        this.setState({ inputValue: "" });
        return;
      }
    }
    fetch("../data/modules/MENU/allmods.json")
      .then(res => res.json())
      .then(data => {
        if (inputcode in data) {
          const { adyear, major } = this.props;
          storage.addNewMod(adyear, major, inputcode);
          let { draggables, click } = this.state;
          click++;
          draggables.push([inputcode, "rgb(120,206,179)", "additional"]);
          this.setState({
            inputValue: "",
            draggables: draggables,
            click: click
          });
        } else {
          message.warning(inputcode + " is invalid", 5);
        }
      });
  }
}

export default SearchBar;
