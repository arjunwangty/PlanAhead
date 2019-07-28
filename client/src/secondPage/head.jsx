import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import "../style/info.less";

class Head extends Component {
  render() {
    const { adyear, major } = this.props;
    return (
      <div className="login-header">
        <Row>
          <Col
            span={1}
            style={{
              verticalAlign: "middle"
            }}
          />
          <Col
            span={3}
            style={{
              verticalAlign: "middle"
            }}
          >
            <img src="https://i.ibb.co/TYW2zVW/title.png" alt="PlanAhead" />
          </Col>
          <Col
            span={19}
            style={{
              verticalAlign: "right"
            }}
          >
            <h1
              style={{
                fontWeight: "normal",
                fontSize: "15px"
              }}
            >{`${adyear}  ${major}`}</h1>
          </Col>
        </Row>
        <Divider
          style={{
            border: "0px",
            padding: 0,
            margin: "10px"
          }}
        />
      </div>
    );
  }
}

export default Head;
