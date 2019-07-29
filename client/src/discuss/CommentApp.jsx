import React, { Component } from "react";
import axios from "axios";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import "./discuss.css";
import MyFooter from "../component/myFooter";
import { Layout, Menu, message } from "antd";

const { Content, Sider, Footer } = Layout;
const firstMajor = [
  "Data Science and Analytics",
  "Computer Science",
  "Infomation Systems",
  "Infomation Security",
  "Business Analytics"
];

class CommentApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    this._loadComments("all");
  }

  _loadComments(value) {
    if (value === "all") {
      axios.get("/comments").then(res => {
        this.setState({ comments: res.data });
      });
    } else {
      axios.get("/comments").then(res => {
        const coms = res.data.filter(x => x.course === value);
        this.setState({ comments: coms });
      });
    }
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return message.warning("Please enter a username");
    if (!comment.comment) return message.warning("Please enter your comment");
    axios
      .post("/comments", {
        username: comment.username,
        course: comment.course,
        year: comment.year,
        comment: comment.comment
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    return message.success(
      "Comment submitted, please reload the page to view your comment "
    );
  }

  handleSelect(value) {
    this._loadComments(value);
  }

  render() {
    return (
      <div>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100%",
              position: "fixed",
              left: 0
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
              <Menu.Item key="0" onClick={this.handleSelect.bind(this, "all")}>
                All
              </Menu.Item>
              {firstMajor.map(y => (
                <Menu.Item
                  key={firstMajor.indexOf(y) + 1}
                  onClick={this.handleSelect.bind(this, y)}
                >
                  {y}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
              </div>
              <div>
                <CommentList comments={this.state.comments} />
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
        </Layout>
      </div>
    );
  }
}

export default CommentApp;
