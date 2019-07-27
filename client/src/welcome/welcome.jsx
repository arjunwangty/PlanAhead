import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { message, Select, Button } from "antd";
import test from "./test";
import "./welcome.less";

const { Option } = Select;
const yearOfEnrolment = [
  "AY2012/2013",
  "AY2013/2014",
  "AY2014/2015",
  "AY2015/2016",
  "AY2016/2017",
  "AY2017/2018",
  "AY2018/2019",
  "AY2019/2020"
];
const firstMajor = [
  "Data Science and Analytics",
  "Computing Science",
  "Infomation Systems",
  "Infomation Security",
  "Business Analytics"
];

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      adyear: "",
      major: ""
    };
    this.redirectHanlder = this.redirectHanlder.bind(this);
    this.setState = this.setState.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.redirectHanlder = this.redirectHanlder.bind(this);
  }

  redirectHanlder() {
    const { adyear, major } = this.state;

    if (adyear === "") {
      message.warning("Please choose your year of enrolment", 3);
      return;
    } else if (major === "") {
      message.warning("Please choose your first major", 3);
      return;
    }

    if (test(adyear, major) === true) {
      this.setState({ redirect: true });
    } else {
      message.warning("Programme Information is not available", 3);
      this.setState({ redirect: false });
    }
  }

  onChange1(value) {
    let temp = value;
    this.setState({ adyear: temp });
  }

  onChange2(value) {
    this.setState({ major: value });
  }

  render() {
    let { redirect, adyear, major } = this.state;
    return redirect ? (
      <Redirect
        push
        to={{
          pathname: "/planner",
          search: `${adyear}?${major}`,
          state: { year: adyear, major: major }
        }}
      />
    ) : (
      <div className="selection">
        <img
          src="https://i.ibb.co/TYW2zVW/title.png"
          className="title"
          alt="title"
        />
        <div className="selectionbar">
          <div>
            <label>Year of enrolment</label>
            <Select
              showSearch
              className="selectionbar1"
              placeholder="Select your admitted year"
              optionFilterProp="children"
              onChange={this.onChange1}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {yearOfEnrolment.map(y => (
                <Option value={y}>{y}</Option>
              ))}
            </Select>
          </div>
          <div>
            <label>First major</label>
            <Select
              showSearch
              className="selectionbar2"
              placeholder="Select your first major"
              optionFilterProp="children"
              onChange={this.onChange2}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {firstMajor.map(y => (
                <Option value={y}>{y}</Option>
              ))}
            </Select>
          </div>
          <Button onClick={this.redirectHanlder}>Let's start!</Button>
        </div>
      </div>
    );
  }
}

export default Welcome;
