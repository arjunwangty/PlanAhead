import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Select, Modal } from "antd";
import Login from "../component/Login";
import "./discuss.css";
import { Button } from "antd";
import jwt_decode from "jwt-decode";

const { TextArea } = Input;
const { Option } = Select;
const InputGroup = Input.Group;

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
  "Computer Science",
  "Infomation Systems",
  "Infomation Security",
  "Business Analytics"
];

class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      id: "",
      username: "",
      email: "",
      comment: "",
      course: "",
      year: "",
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ visible: false });
    this.handleSubmit();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    if (localStorage.usertoken === undefined) {
    } else {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      console.log(decoded);
      this.setState({
        username: decoded.username,
        email: decoded.email
      });
    }
  }

  handleCommentChange(event) {
    this.setState({
      comment: event.target.value
    });
  }
  handleCourseChange(value) {
    this.setState({
      course: value
    });
  }
  handleYearChange(value) {
    this.setState({
      year: value
    });
  }
  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, comment, course, year } = this.state;
      this.props.onSubmit({ username, comment, course, year });
    }
    this.setState({ comment: "" });
  }

  render() {
    if (this.state.username !== "") {
      console.log(this.state);
      return (
        <div>
          <div>
            <span>Username: </span>
            <span className="name">{this.state.username}</span>
          </div>
          <div>
            <span>Details:</span>
            <InputGroup
              compact
              style={{ marginTop: "5px", marginBottom: "10px" }}
            >
              <Select
                showSearch
                style={{ width: "60%" }}
                placeholder="First major"
                optionFilterProp="children"
                onChange={this.handleCourseChange.bind(this)}
              >
                {firstMajor.map(y => (
                  <Option key={y} value={y}>
                    {y}
                  </Option>
                ))}
              </Select>

              <Select
                showSearch
                style={{ width: "40%" }}
                placeholder="Year of Admission"
                optionFilterProp="children"
                onChange={this.handleYearChange.bind(this)}
              >
                {yearOfEnrolment.map(y => (
                  <Option key={y} value={y}>
                    {y}
                  </Option>
                ))}
              </Select>
            </InputGroup>
          </div>
          <div>
            <span className="comment-field-name">Comment:</span>
            <div className="comment-field-input">
              <TextArea
                style={{ marginTop: "5px", marginBottom: "10px" }}
                rows={4}
                value={this.state.comment}
                onChange={this.handleCommentChange.bind(this)}
              />
            </div>
          </div>
          <div className="comment-field-button">
            <Button onClick={this.showModal.bind(this)}>Submit</Button>
          </div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Ok
              </Button>
            ]}
          >
            <br />
            <p>
              Once submitted, you will not be able to delete or edit your post.
              Confirm submission?
            </p>
          </Modal>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default CommentInput;
