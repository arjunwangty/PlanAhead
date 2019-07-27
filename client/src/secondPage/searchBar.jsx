import React, { Component } from "react";
import Droppable from "./droppable";
import Draggable from "./draggable";
import Mod from "./mod";
import { Input } from 'antd';


const wrapperStyle2 = {
  padding: "2px",
  display: "inline-block",
  backgroundColor: "white",
  border: "1px solid #C8C8C8",
  borderRadius: "3px",
  textAlign: "left",
  width: "100%",
  height: "70px"
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      draggables: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ paddingTop: "10px", color: "white" }}>
          <Input
            placeholder="Search for a module"
            id="insertion"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            autoComplete="off"
          />
          <button
            className="btn btn-info btn-sm"
            style={{
              marginLeft: "8px",
              fontSize: "13px"
            }}
            onClick={this.handleBtnClick}
          >
            Go
          </button>
        </div>
        <div>
          <Droppable id="SearchBar" isDroppable={true}>
            <div
              id="SearchBarContainer"
              className="container pre-scrollable list-inline"
              style={wrapperStyle2}
            >
              {this.state.draggables.map(mod => (
                <Draggable className="list-inline-item" id={`${mod.id}Draggable`} name="additional">
                  <Mod
                    id={mod.id}
                    code={mod.code}
                    title={mod.title}
                    name="additional"
                  />
                </Draggable>
              ))}
            </div>
          </Droppable>
        </div>
        <Droppable id="dustDroppable" style={{height:'30px', backgroundColor:'red'}} isDroppable={true}>
          <div id='dust'>
            delete
          </div>
        </Droppable>
      </React.Fragment>
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
    let allModules = document.getElementsByTagName('button');
    for (let i = 0; i<allModules.length; i++){
      if (allModules[i].getAttribute('id')===inputcode){
        alert(`${inputcode} already exists!`);
        this.setState({inputValue: ""});
        return;
      }
    }
    fetch("http://api.nusmods.com/2018-2019/1/moduleList.json")
      .then(res => res.json())
      .then(data => {
        if (inputcode in data) {
          this.setState(prevState => ({
            draggables: [
              ...prevState.draggables,
              {
                id: inputcode,
                code: inputcode,
                title: data[inputcode]
              }
            ],
            inputValue: ""
          }));
        } else {
          alert(inputcode + " is invalid");
        }
      });
  }

}

export default SearchBar;
