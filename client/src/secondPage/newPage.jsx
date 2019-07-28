import React, { Component } from "react";
import NSideBar from "./newSideBar";
import NPlanner from "./newPlanner";
import SearchBar from "./searchBar";
import Delete from "./dust";
import Head from "./head";

import { Row, Col } from "antd";
import storage from "../component/storage";
import "../style/info.less";

class EntirePage extends Component {
  render() {
    const { year, major } = this.props.location.state;
    const init = storage.storeYM(year, major);
    const mc = storage.getYMCol(year, major, "totalmc");
    return (
      <div
        style={{
          textAlign: "center",
          verticalAlign: "middle"
        }}
      >
        <Head adyear={year} major={major} />
        <Row>
          <Col
            span={7}
            style={{
              verticalAlign: "middle"
            }}
          >
            <NSideBar adyear={year} major={major} init={init} />
            <SearchBar adyear={year} major={major} />
            <Delete adyear={year} major={major} />
            <div className="info">
              <p>
                <strong>Module code: </strong>
                <em id="ModuleCode" />
              </p>
              <p>
                <strong>Module Credits: </strong>
                <em id="ModuleCredits" />
              </p>
              <p>
                <strong>Module Prerequisite: </strong>
                <em id="ModulePrerequisite" />
              </p>
              <p>
                <strong>Module description: </strong>
                <em id="ModuleDescription" />
              </p>
            </div>
          </Col>
          <Col span={17}>
            <NPlanner adyear={year} major={major} init={init} />
            <p>
              total mc:<em id="totalmc">{mc}</em>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EntirePage;
