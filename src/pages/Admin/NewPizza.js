import React, { Component } from "react";
import { Form, Input, Button, Message } from "antd";
import Request from "../../utils/Request";

const { TextArea } = Input;

class NewPizza extends Component {
  handleSubmit = () => {
    // console.log(this.props.form);
    this.props.form.validateFields((err, value) => {
      // console.log(value);
      if (!err) {
        const { name, description, size1, price1, size2, price2 } = value;
        let data = {
          name,
          description,
          options: [
            {
              size: size1,
              price: price1,
            },
            {
              size: size2,
              price: price2,
            },
          ],
        };
        // Post Request
        Request("/menu.json", {
          method: "post",
          data,
        }).then((res) => {
          if (res && res.status === 200 && res.data) {
            Message.success("Add Succeed!");
            window.location.href = "/#/menus";
          } else {
            Message.error("Add Fail!");
          }
        });
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
      colon: false,
    };

    const { getFieldDecorator } = this.props.form;
    const required = true;

    return (
      <div>
        <h3>Add new pizza @</h3>
        <Form>
          <Form.Item {...formItemLayout} label="Kind">
            {getFieldDecorator("name", {
              rules: [
                {
                  required,
                  message: "Please enter the kind",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Descrip">
            {getFieldDecorator("description")(<TextArea />)}
          </Form.Item>
          <p>
            <strong>Option1:</strong>
          </p>
          <Form.Item {...formItemLayout} label="Size">
            {getFieldDecorator("size1", {
              rules: [
                {
                  required,
                  message: "Please enter size",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Price">
            {getFieldDecorator("price1", {
              rules: [
                {
                  required,
                  message: "Please enter price",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <p>
            <strong>Option2:</strong>
          </p>
          <Form.Item {...formItemLayout} label="Size">
            {getFieldDecorator("size2", {
              rules: [
                {
                  required,
                  message: "Please enter size",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Price">
            {getFieldDecorator("price2", {
              rules: [
                {
                  required,
                  message: "Please enter price",
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item>
            <Button
              onClick={this.handleSubmit}
              type="primary"
              className="btn-w-p100"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(NewPizza);
