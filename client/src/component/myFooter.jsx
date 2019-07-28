import React, { Component } from "react";
import { Divider } from "antd";
import "../style/info.less";

class MyFooter extends Component {
  render() {
    return (
      <div className="foot">
        <p>
          Relavent Links:
          <em>
            <a href="http://www.nus.edu.sg/" target="view_window">
              NUS
            </a>{" "}
            <a href="https://nusmods.com/timetable/sem-1" target="view_window">
              NUSMods
            </a>
            <a
              href="https://www.comp.nus.edu.sg/about/depts/cs/"
              target="view_window"
            >
              NUS School of Computing
            </a>
            <a
              href="http://www.nus.edu.sg/research/smartnation/"
              target="view_window"
            >
              NUS Data Science and Analytics
            </a>
          </em>
        </p>
        <div style={{ height: "170px" }} />
        <Divider
          style={{
            backgroundColor: "rgb(40, 80, 128)",
            border: "0px",
            padding: 0,
            margin: 0
          }}
        />
        <p className="sign">© 2019 National University of Singapore.</p>
        <p className="sign">Developer: Team 1817 @ Orbital 2019</p>
      </div>
    );
  }
}

export default MyFooter;
