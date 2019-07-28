import React, { Component } from "react";
import SemDrop from "./semDrop";
import PropTypes from "prop-types";
import { Select } from "antd";
import "../style/sem.less";
const { Option } = Select;

const wrapperStyle1 = {
  verticalAlign: "middle",
  float: "none",
  display: "inline-block",
  height: "500px",
  justifyContent: "center",
  backgroundColor: "rgb(207,231,241)",
  borderRadius: "5px",
  textAlign: "center",
  width: "100px"
};
const wrapperStyle2 = {
  verticalAlign: "middle",
  float: "none",
  display: "inline-block",
  height: "500px",
  justifyContent: "center",
  backgroundColor: "rgb(161,207,228)",
  borderRadius: "5px",
  textAlign: "center",
  width: "100px"
};
const wrapperStyle3 = {
  verticalAlign: "middle",
  float: "none",
  display: "inline-block",
  height: "500px",
  justifyContent: "center",
  backgroundColor: "rgb(255, 224, 179)",
  borderRadius: "5px",
  textAlign: "center",
  width: "100px"
};


export default class Sem extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      sem: [
        [2, "Yr1 Vac1"],
        [4, "Yr1 Vac2"],
        [6, "Y2 Vac1"],
        [8, "Y2 Vac2"],
        [10, "Y3 Vac1"],
        [12, "Y3 Vac3"],
        [14, "Yr4 Vac1"],
        [16, "Yr4 Vac2"],
        [17, "Yr5 Sem1"],
        [18, "Yr5 Vac1"],
        [19, "Yr5 Sem2"]
      ]
    };
  }

  onChange(value) {
    this.props.onChoose(value);
  }

  render() {
    var wrapperstyle = {};
    if (this.props.semester === "Semester 1") {
      wrapperstyle = wrapperStyle1;
    } else if (this.props.semester === "Semester 2") {
      wrapperstyle = wrapperStyle2;
    } else {
      wrapperstyle = wrapperStyle3;
    }

    if (this.props.id === "t") {
      return (
        <div className="col-md-1.5" style={wrapperstyle}>
          <p>year</p>
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            style={{ width: "95px" }}
            showSearch
            className="chooseyear"
            placeholder="Year"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.sem.map(y => (
              <Option style={{fontSize:"12px"}}value={y[0].toString()}>{y[1]}</Option>
            ))}
          </Select>
          <br></br><br></br>
          <SemDrop
            id={this.props.id}
            isDroppable={false}
            adyear={this.props.adyear}
            major={this.props.major}
          />
          <button
            className="cross"
            onClick={this.props.onDelete}
            value={this.props.id}
          >
            ×
          </button>
        </div>
      );
    } else if (
      this.props.semester === "Semester 1" ||
      this.props.semester === "Semester 2"
    ) {
      if (this.props.year !== "Year 5") {
        return (
          <div className="col-md-1.5" style={wrapperstyle}>
            <p className="text-center">{this.props.year}</p>
            <p>{this.props.semester}</p>
            <button id={`${this.props.id}button`}>{this.props.button}</button>
            <SemDrop
              id={this.props.id}
              isDroppable={true}
              adyear={this.props.adyear}
              major={this.props.major}
            />
          </div>
        );
      } else {
        return (
          <div className="col-md-1.5" style={wrapperstyle}>
            <p className="text-center">{this.props.year}</p>
            <p>{this.props.semester}</p>
            <button id={`${this.props.id}button`}>{this.props.button}</button>
            <SemDrop
              id={this.props.id}
              isDroppable={true}
              adyear={this.props.adyear}
              major={this.props.major}
            />
            <button
            className="cross"
            onClick={this.props.onDelete}
            value={this.props.id}
          >
            ×
          </button>
          </div>
        );
      }
    } else {
      return (
        <div className="col-md-1.5" style={wrapperstyle}>
          <p className="text-center">{this.props.year}</p>
          <p>{this.props.semester}</p>
          <button id={`${this.props.id}button`}>{this.props.button}</button>
          <SemDrop
            id={this.props.id}
            isDroppable={true}
            adyear={this.props.adyear}
            major={this.props.major}
          />
          <button
            className="cross"
            onClick={this.props.onDelete}
            value={this.props.id}
          >
            ×
          </button>
        </div>
      );
    }
  }
}

Sem.propTypes = {
  id: PropTypes.string,
  year: PropTypes.string,
  semester: PropTypes.string,
  menu: PropTypes.node
};
