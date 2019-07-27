import React, { Component } from "react";
import NSideBar from "./newSideBar";
import NPlanner from "./newPlanner";
import SearchBar from "./searchBar";
import { Row, Col } from 'antd';


class EntirePage extends Component {
  
  render() {
    const {year, major} = this.props.location.state;
    return (
      <div
        style={{
          textAlign: "center",
          verticalAlign: "middle"
        }}
      >
        <Row>
          <Col span={6}
            style={{
              verticalAlign: "middle",
              height: "100%"
            }}
          >
              <NSideBar className="pre-scrollable" adyear={year} major={major}/>
            <div
              style={{
                backgroundColor: "rgb(120,206,179)",
                marginTop: "5px",
                marginBottom: "5px",
                borderRadius: "4px",
                width: "270px"
              }}
            >
              <SearchBar />
            </div>
            <div
              className="pre-scrollable col-mid-4"
              style={{
                height: "140px",
                padding: "10px",
                paddingLeft: "15px",
                backgroundColor: "rgb(69,118,149)",
                borderRadius: "4px",
                textAlign: "left",
                color: "white",
                width: "270px"
              }}
            >
              <p>
                <strong>Module code:</strong>
                <em id="ModuleCode" />
              </p>
              <p>
                Module Credits:
                <em id="ModuleCredits" />
              </p>
              <p>
                Module Prerequisite:
                <em id="ModulePrerequisite" />
              </p>
              <p>
                Module description:
                <em id="ModuleDescription" />
              </p>
            </div>
          </Col>
          <Col span={16} style={{
                  whiteSpace: "nowrap",
                  verticalAlign: "middle",
                  overflowX: "scroll",
                  height: "100%"
                }}>
                <NPlanner />
              <p>total mc:<em id="totalmc">0</em></p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EntirePage;