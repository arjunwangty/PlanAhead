import React, { Component } from "react";
import { login } from "./UserFunctions";
import { Link } from "react-router-dom";
import { Input, Form, Button, Icon } from "antd";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleRegister = () => {
    this.props.history.push(`/register`);
  };

  onSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ email: values.email, password: values.password }, () =>
          this.handleLoginUser()
        );
      }
    });
  }

  handleLoginUser() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    login(user).then(res => {
      if (res) {
        window.location.reload();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please input a valid email address!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              name="email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              name="password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ display: "inline-block", marginRight: "5px" }}
          >
            Sign in
          </Button>
          or
          <Link
            to={"/register"}
            style={{ display: "inline-block", marginLeft: "5px" }}
          >
            register now!
          </Link>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Login);
