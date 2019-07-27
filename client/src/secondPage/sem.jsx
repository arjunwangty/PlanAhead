import React, { Component } from "react";
import SemDrop from "./semDrop";
import PropTypes from "prop-types";
import { Select } from "antd";

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

const newStyle = {
  verticalAlign: "middle",
  justifyContent: "center",
  whiteSpace: "normal",
  backgroundColor: "rgba(0,0,0,0)",
  height: "90%"
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
        [16, "Yr4 Vac2"]
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

    if (this.props.semester === "Semester") {
      return (
        <div className="col-md-1.5" style={wrapperstyle}>
          <p>year</p>
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            style={{width: "75px"}}
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
              <Option value={y[0].toString()}>{y[1]}</Option>
            ))}
          </Select>
          <button id={`${this.props.id}button`}>0</button>
          <SemDrop id={this.props.id} isDroppable={false} style={newStyle} />
          <button
            className="btn btn-primary"
            style={{
              verticalAlign: "middle",
              height: "5%",
              width: "99%",
              color: "rgb(207,231,241)",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
              display: "inline-block",
              fontSize: "15px",
              margin: "0% 3% 3% 0%",
              padding: "0px 0px 8px 0px",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px"
            }}
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
            <button id={`${this.props.id}button`}>0</button>
            <SemDrop id={this.props.id} style={newStyle} isDroppable={true} />
          </div>
        );
      } else {
        return (
          <div className="col-md-1.5" style={wrapperstyle}>
            <p className="text-center">{this.props.year}</p>
            <p>{this.props.semester}</p>
            <button id={`${this.props.id}button`}>0</button>
            <SemDrop id={this.props.id} isDroppable={true} style={newStyle} />
            <button
              className="btn btn-primary"
              style={{
                verticalAlign: "middle",
                height: "5%",
                width: "99%",
                color: "rgb(207,231,241)",
                border: "none",
                borderRadius: "3px",
                textAlign: "center",
                display: "inline-block",
                fontSize: "15px",
                margin: "0% 3% 3% 0%",
                padding: "0px 0px 8px 0px",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px"
              }}
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
          <SemDrop id={this.props.id} isDroppable={true} style={newStyle} />
          <button
            className="btn btn-warning"
            style={{
              verticalAlign: "middle",
              height: "5%",
              width: "99%",
              color: "rgb(255, 224, 179)",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
              display: "inline-block",
              fontSize: "15px",
              margin: "0% 3% 3% 0%",
              padding: "0px 0px 8px 0px",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px"
            }}
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
