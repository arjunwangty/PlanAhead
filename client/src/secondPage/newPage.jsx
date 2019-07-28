import React, { Component } from "react";
import NSideBar from "./newSideBar";
import NPlanner from "./newPlanner";
import SearchBar from "./searchBar";
import Delete from "./dust";
import Head from "./head";
import MyFooter from "../component/myFooter";

import { Layout, Tag } from "antd";
import storage from "../component/storage";
import "../style/info.less";

const { Content, Footer } = Layout;

class EntirePage extends Component {
  render() {
    const { year, major } = this.props.location.state;
    const init = storage.storeYM(year, major);
    const mc = storage.getYMCol(year, major, "totalmc");
    return (
      <Layout>
        <Content style={{ backgroundColor: "white" }}>
          <Head adyear={year} major={major} />
          <div
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              paddingBottom: "50px"
            }}
          >
            <div
              style={{
                width: "300px",
                paddingTop: "20px",
                verticalAlign: "middle",
                overflow: "auto",
                height: "100%",
                position: "absolute",
                left: 0
              }}
            >
              <NSideBar adyear={year} major={major} init={init} />
              <SearchBar adyear={year} major={major} />
              <Delete adyear={year} major={major} />
              <div className="info">
                <p>
                  Module code:
                  <em id="ModuleCode" />
                </p>
                <p>
                  Module credits:
                  <em id="ModuleCredits" />
                </p>
                <p>
                  Module prerequisite:
                  <em id="ModulePrerequisite" />
                </p>
                <p>
                  Module description:
                  <em id="ModuleDescription" />
                </p>
              </div>
            </div>
            <Layout style={{ marginLeft: 300, backgroundColor: "white" }}>
              <div>
                <NPlanner adyear={year} major={major} init={init} />
                <Tag style={{ padding: "10px", fontSize: "14px" }}>
                  Total Modular Credits: <em id="totalmc">{mc}</em>
                </Tag>
              </div>
            </Layout>
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

export default EntirePage;
