import React, { Component } from "react";
import axios from "axios";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import "./discuss.css";
import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;
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
        console.log(this.state.comments);
      });
    } else {
      axios.get("/comments").then(res => {
        const coms = res.data.filter(x => x.course === value);
        this.setState({ comments: coms });
        console.log(value);
      });
    }
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert("Please enter a username");
    if (!comment.comment) return alert("Please enter your comments");
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

    this._loadComments();
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
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default CommentApp;
