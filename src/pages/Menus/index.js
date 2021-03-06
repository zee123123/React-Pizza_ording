import React, { Component } from "react";
import { Table, Button, Icon, Row, Col } from "antd";
import Request from "../../utils/Request";
import style from "./index.scss";

export default class index extends Component {
  state = {
    cart: [],
    menus: [],
  };

  // Hook function
  componentDidMount() {
    this.getMenusData();
  }

  // Get data from list of menu
  getMenusData = () => {
    Request("/menu.json").then((res) => {
      // console.log(res);
      if (res && res.status === 200 && res.data) {
        this.setState({
          menus: res.data,
        });
      }
    });
  };

  renderMenusTable() {
    const columns = [
      {
        key: "size",
        title: "Size",
        dataIndex: "size",
        render: (text, record) => {
          // console.log(record);
          if (record.price) {
            return <span>{text}</span>;
          }
          return {
            children: <strong>{text}</strong>,
            props: {
              colSpan: 2,
            },
          };
        },
      },
      {
        key: "price",
        title: "Price",
        dataIndex: "price",
        render: (text, record) => {
          return <span>{text}</span>;
        },
      },
      {
        key: "action",
        title: "Add",
        render: (text, record) => {
          const obj = {
            children: (
              <Button
                onClick={() => handleAddMenus(record)}
                className={style["add-btn"]}
              >
                <Icon type="plus" />
              </Button>
            ),
            props: [],
          };
          if (!record.price) {
            obj.props.colSpan = 0;
          }
          return obj;
        },
      },
    ];

    const handleAddMenus = (record) => {
      // console.log(record);
      // const { name, price, size } = record;

      let { cart } = this.state;
      const index = cart.findIndex((item) => item.key === record.key);
      // console.log(index);
      index >= 0
        ? cart.splice(index, 1, {
            ...cart[index],
            count: cart[index].count + 1,
          })
        : (cart = [
            ...cart,
            {
              ...record,
              count: 1,
            },
          ]);

      // store into state
      this.setState({
        cart,
      });
    };

    let data = this.state.menus;

    // Handle the process information
    let dataSource = [];
    for (const key in data) {
      // console.log(data[item]);
      let item = data[key];
      dataSource.push({
        key: item.name,
        size: item.name,
      });
      item.options.forEach((ele, index) => {
        dataSource.push({ ...ele, name: item.name, key: key + "-" + index });
      });
    }
    // console.log(dataSource);

    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={dataSource}
        columns={columns}
      />
    );
  }
  renderCartTable() {
    const columns = [
      {
        key: "count",
        title: "Count",
        dataIndex: "count",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => handleDecrease(record)}
              className={style["cart-btn"]}
            >
              -
            </Button>
            <span>{record.count}</span>
            <Button
              onClick={() => handleIncrease(record)}
              className={style["cart-btn"]}
            >
              +
            </Button>
          </span>
        ),
      },
      {
        key: "name",
        title: "Menu",
        dataIndex: "name",
      },
      {
        key: "price",
        title: "Price",
        dataIndex: "price",
      },
    ];
    // minus
    const handleDecrease = (record) => {
      // cart data
      let { cart } = this.state;
      const index = cart.findIndex((item) => item.key === record.key);
      const current = cart[index];
      // console.log(current);
      if (current.count <= 1) {
        cart.splice(index, 1);
      } else {
        cart.splice(index, 1, {
          ...current,
          count: current.count - 1,
        });
      }
      // Update cart
      this.setState({
        cart,
      });
    };
    // Add
    const handleIncrease = (record) => {
      // cart data
      let { cart } = this.state;
      const index = cart.findIndex((item) => item.key === record.key);
      const current = cart[index];

      cart.splice(index, 1, {
        ...current,
        count: current.count + 1,
      });

      this.setState({
        cart,
      });
    };

    return (
      <Table
        pagination={false}
        className="menus-table cart"
        dataSource={this.state.cart}
        columns={columns}
        locale={{
          emptyText: "Your shopping cart is empty!",
        }}
      />
    );
  }

  render() {
    const totalPrice = this.state.cart.reduce(
      (total, item) => (total += item.price * item.count),
      0
    );
    return (
      <Row>
        <Col sm={24} md={16}>
          {this.renderMenusTable()}
        </Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={style["total-price"]}>Total: {totalPrice}</p>
          <Button type="primary" className={style["submit-btn"]}>
            Submit
          </Button>
        </Col>
      </Row>
    );
  }
}
