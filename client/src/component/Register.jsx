import React, { Component } from "react";
import { register } from "./UserFunctions";
import { Row, Col, Input, Tooltip, Form, Button, Icon } from "antd";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newUser = {
          username: values.username,
          email: values.email,
          password: values.password
        };
        console.log(newUser);
        register(newUser).then(res => {
          this.props.history.push(`/discussion`);
        });
      }
    });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div>
        <br />
        <br />
        <Row>
          <Col span={8} offset={8}>
            <Form {...formItemLayout} onSubmit={this.onSubmit}>
              <Form.Item
                label={
                  <span>
                    Username&nbsp;
                    <Tooltip title="This will be displayed on your posts">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input a username!" }
                  ]
                })(<Input name="username" />)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input a valid email address!"
                    }
                  ]
                })(<Input name="email" />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password name="password" />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.onSubmit}
                >
                  Register Now
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Register);
