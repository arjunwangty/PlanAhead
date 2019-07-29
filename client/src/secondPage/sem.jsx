import React, { Component } from "react";
import SemDrop from "./semDrop";
import PropTypes from "prop-types";
import { Select, Tag, Icon, Button } from "antd";
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
        [6, "Yr2 Vac1"],
        [8, "Yr2 Vac2"],
        [10, "Yr3 Vac1"],
        [12, "Yr3 Vac2"],
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
          <p className="year">New</p>
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            style={{ width: "80px", height: "30px" }}
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
              <Option style={{ fontSize: "12px" }} value={y[0].toString()}>
                {y[1]}
              </Option>
            ))}
          </Select>
          <br />
          <br />
          <br />
          <SemDrop
            id={this.props.id}
            isDroppable={false}
            adyear={this.props.adyear}
            major={this.props.major}
          />
          <Button
            className="cross"
            onClick={this.props.onDelete}
            value={this.props.id}
          >
            <Icon type="delete" />
          </Button>
        </div>
      );
    } else if (
      this.props.semester === "Semester 1" ||
      this.props.semester === "Semester 2"
    ) {
      if (this.props.year !== "Year 5") {
        return (
          <div className="col-md-1.5" style={wrapperstyle}>
            <p className="year">{this.props.year}</p>
            <p className="sem">{this.props.semester}</p>
            <Tag style={{ marginBottom: "14px" }} id={`${this.props.id}button`}>
              {this.props.button}
            </Tag>
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
            <p className="year">{this.props.year}</p>
            <p className="sem">{this.props.semester}</p>
            <Tag style={{ marginBottom: "14px" }} id={`${this.props.id}button`}>
              {this.props.button}
            </Tag>
            <SemDrop
              id={this.props.id}
              isDroppable={true}
              adyear={this.props.adyear}
              major={this.props.major}
            />
            <Button
              className="cross"
              onClick={this.props.onDelete}
              value={this.props.id}
            >
              <Icon type="delete" />
            </Button>
          </div>
        );
      }
    } else {
      return (
        <div className="col-md-1.5" style={wrapperstyle}>
          <p className="year">{this.props.year}</p>
          <p className="sem">{this.props.semester}</p>
          <Tag style={{ marginBottom: "14px" }} id={`${this.props.id}button`}>
            {this.props.button}
          </Tag>
          <SemDrop
            id={this.props.id}
            isDroppable={true}
            adyear={this.props.adyear}
            major={this.props.major}
          />
          <Button
            className="cross"
            onClick={this.props.onDelete}
            value={this.props.id}
          >
            <Icon type="delete" />
          </Button>
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
