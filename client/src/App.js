import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import Welcome from "./welcome/welcome";
import EntirePage from "./secondPage/newPage";
import CommentApp from "./discuss/CommentApp";
import MyFooter from "./component/myFooter";
import { Menu, Icon, Layout } from "antd";

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    current: "home"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Layout>
        <Router>
          <Header
            style={{
              backgroundColor: "white",
              position: "fixed",
              zIndex: 1,
              width: "100%",
              padding: "0px"
            }}
          >
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{
                lineHeight: "64px",
                paddingLeft: "0px"
              }}
            >
              <Menu.Item
                key="home"
                style={{
                  width: "130px",
                  height: "60px"
                }}
              >
                <Icon type="home" style={{ display: "inline-block" }} />
                <Link to={"/"} style={{ display: "inline-block" }}>
                  {" "}
                  Home{" "}
                </Link>
              </Menu.Item>
              <Menu.Item
                key="message"
                style={{ width: "130px", height: "60px" }}
              >
                <Icon type="message" style={{ display: "inline-block" }} />
                <Link to={"/discussion"} style={{ display: "inline-block" }}>
                  Discussion
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              backgroundColor: "white",
              padding: "0px",
              marginTop: "64px"
            }}
          >
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/planner" component={EntirePage} />
              <Route path="/discussion" component={CommentApp} />
              <Redirect exact strict push from="/" to="/planner" />
            </Switch>
          </Content>
          <MyFooter />
        </Router>
      </Layout>
    );
  }
}

export default App;
