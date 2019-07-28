import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { message, Select, Button, Layout } from "antd";
import test from "./test";
import MyFooter from "../component/myFooter";
import "../style/welcome.less";

const { Content, Footer } = Layout;
const { Option } = Select;

const yearOfEnrolment = [
  "AY2014/2015",
  "AY2015/2016",
  "AY2016/2017",
  "AY2017/2018",
  "AY2018/2019",
  "AY2019/2020"
];
const firstMajor = [
  "Data Science and Analytics",
  "Computer Science",
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

  componentWillMount() {
    this._loadSettings();
  }

  _loadSettings() {
    const adyear = localStorage.getItem("adyear");
    const major = localStorage.getItem("major");
    if (adyear) {
      this.setState({ adyear });
    }
    if (major) {
      this.setState({ major });
    }
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
    localStorage.setItem("adyear", temp);
  }

  onChange2(value) {
    this.setState({ major: value });
    localStorage.setItem("major", value);
  }

  _loadSB1() {
    if (this.state.adyear === "") {
      return (
        <Select
          showSearch
          key="selectionbar1"
          className="selectionbar1"
          placeholder="Select your year of admission"
          optionFilterProp="children"
          onChange={this.onChange1}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {yearOfEnrolment.map(y => (
            <Option value={y} key={y}>
              {y}
            </Option>
          ))}
        </Select>
      );
    } else {
      return (
        <Select
          showSearch
          key="selectionbar1"
          className="selectionbar1"
          optionFilterProp="children"
          onChange={this.onChange1}
          defaultValue={this.state.adyear}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {yearOfEnrolment.map(y => (
            <Option value={y} key={y}>
              {y}
            </Option>
          ))}
        </Select>
      );
    }
  }

  _loadSB2() {
    if (this.state.major === "") {
      return (
        <Select
          showSearch
          key="selectionbar2"
          className="selectionbar2"
          placeholder="Select your first major"
          optionFilterProp="children"
          onChange={this.onChange2}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {firstMajor.map(y => (
            <Option value={y} key={y}>
              {y}
            </Option>
          ))}
        </Select>
      );
    } else {
      return (
        <Select
          showSearch
          key="selectionbar2"
          className="selectionbar2"
          optionFilterProp="children"
          onChange={this.onChange2}
          defaultValue={this.state.major}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {firstMajor.map(y => (
            <Option value={y} key={y}>
              {y}
            </Option>
          ))}
        </Select>
      );
    }
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
      <Layout>
        <Content style={{ backgroundColor: "white" }}>
          <div className="selection">
            <img
              src="https://i.ibb.co/TYW2zVW/title.png"
              className="title"
              alt="title"
            />
            <div className="selectionbar">
              <div>
                <label className="lab1">Year of admission</label>
                {this._loadSB1()}
              </div>
              <div>
                <label className="lab2">First major</label>
                {this._loadSB2()}
              </div>
            </div>
            <Button className="submit" onClick={this.redirectHanlder}>
              Let's start!
            </Button>
          </div>
        </Content>
        <Footer
          style={{
            padding: "0px"
          }}
        >
          <MyFooter />
        </Footer>
      </Layout>
    );
  }
}

export default Welcome;
