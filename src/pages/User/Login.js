import React, { Component } from "react";
import { Form, Input, Button, Message } from "antd";
import { email_reg, pwd_reg } from "../../utils/Regexp.js";
import { connect } from "dva";
import Request from "../../utils/Request";
import Logo from "Assets/icon.png";
import style from "./account.scss";

@connect()
class index extends Component {
  // Custom form validation rules
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };

  // Customize to check if the password is the same twice
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
      if (!err) {
        const { email, pwd } = values;
        Request("users.json").then((res) => {
          // console.log(res);
          const { data, status } = res;
          if (res && status === 200 && data) {
            let users = [];
            for (const key in data) {
              // console.log(data[key]);
              users.push({
                ...data[key],
                key,
              });
            }
            // console.log(users);
            // Account Password Matching
            users = users.filter((user) => {
              return user.pwd === pwd && user.email === email;
            });
            // console.log(users);
            // Determine if there is content under users
            if (users && users.length) {
              // store into ls
              localStorage.setItem("email", users[0].email);
              localStorage.setItem("key", users[0].key);

              // Store in models
              this.props
                .dispatch({
                  type: "global/setUserInfo",
                  payload: users[0],
                })
                .then(() => {
                  // jump pages
                  this.props.history.push("/");
                });
            } else {
              Message.error("Email or Password wrong, please try again.");
            }
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
          <Form.Item label="email">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Email cannot be empty!",
                },
                // {
                //   type: 'email',
                //   message: 'Please enter correct email form, like: qwe@gmail.com'
                // }
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
          <Form.Item>
            <Button onClick={this.handleSubmit} className="btn" type="primary">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(index);
