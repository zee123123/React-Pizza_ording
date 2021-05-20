import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { email_reg, pwd_reg } from "../../utils/Regexp.js";
import Request from "../../utils/Request";
import Logo from "Assets/icon.png";
import style from "./account.scss";

class index extends Component {
  state = {
    email: "ze@gmail.com",
  };
  // Custom form validation rules
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };

  // Customize to check if the password is the same
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue("pwd")) {
      callback(rule.message);
      return;
    }
    callback();
  };

  // submit
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(err);
      if (!err) {
        const { email, pwd } = values;
        // Send Request
        Request("/users.json", {
          method: "post",
          data: { email, pwd },
        }).then((res) => {
          // console.log(res);
          if (res.status === 200 && res.data) {
            // console.log(this.props.history);
            this.props.history.push("/login");
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.account}>
        <img src={Logo} alt="my logo" className={style.logo} />
        <Form className="account-form">
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Email cannot be empty, please enter your email",
                },
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message:
                    "Please enter correct email form, like: qwe@gmail.com",
                },
              ],
              // initialValue: this.state.email
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator("pwd", {
              rules: [
                {
                  required: true,
                  message: "Password cannot be empty!",
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    "Please enter the correct password format: 16 letters、with numbers and _-.",
                },
              ],
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="Please enter the correct password format: 16 letters、with numbers and _-."
              />
            )}
          </Form.Item>
          <Form.Item label="Confirm Password">
            {getFieldDecorator("aPwd", {
              rules: [
                {
                  required: true,
                  message: "Password cannot be empty！",
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    "Please enter the correct password format: 16 letters、with numbers and _-.",
                },
                {
                  validator: this.validatorPwd,
                  message: "Two passwords you entered does not match",
                },
              ],
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="Please confirm your password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSubmit} className="btn" type="primary">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(index);
