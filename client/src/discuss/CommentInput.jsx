import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Select } from "antd";
import { Button } from "antd";

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
      comment: "",
      course: "",
      year: ""
    };
  }

  componentDidMount() {
    this.textarea.focus();
  }
  _saveUsername(username) {
    localStorage.setItem("username", username);
  }

  handleUsernameBlur(event) {
    this._saveUsername(event.target.value);
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
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
    this.setState({ content: "" });
  }

  componentWillMount() {
    this._loadUsername();
  }

  _loadUsername() {
    const username = localStorage.getItem("username");
    if (username) {
      this.setState({ username });
    }
  }

  render() {
    return (
      <div>
        <div>
          <span>Name:</span>
          <Input
            style={{ marginTop: "5px", marginBottom: "10px" }}
            ref={textarea => (this.textarea = textarea)}
            value={this.state.username}
            onBlur={this.handleUsernameBlur.bind(this)}
            onChange={this.handleUsernameChange.bind(this)}
          />
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
                <Option value={y}>{y}</Option>
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
                <Option value={y}>{y}</Option>
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
          <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default CommentInput;
