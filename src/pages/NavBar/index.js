import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "antd";
import { Link } from "dva/router";
import style from "./index.scss";

const menus = [
  {
    key: "home",
    path: "/home",
    name: "Home",
  },
  {
    key: "menus",
    path: "/menus",
    name: "Menu",
  },
  {
    key: "admin",
    path: "/admin",
    name: "Manage",
  },
  {
    key: "about",
    path: "/about",
    name: "About Us",
  },
  {
    key: "login",
    path: "/login",
    name: "Login",
    className: style.login,
    isAuthority: true,
  },
  {
    key: "register",
    path: "/register",
    name: "Sign Up",
    className: style.register,
    isAuthority: true,
  },
];

export default class index extends Component {
  constructor(props) {
    // console.log(props);
    // console.log('NavBar/index.js');

    super(props);
    this.state = {
      selectedKeys: [],
    };
  }

  /**
   * When the page is refreshed, the component will be reloaded and will execute
   *  componentDidMount(cdm) Hook Function
   *
   * To solve the problem that the refresh page menu is not synchronized with the route,
   * the solution is placed in the cdm hook function
   */
  componentDidMount() {
    this.handleSetSelectedKeys(this.props.location.pathname);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { pathname } = this.props.location;
    if (nextProps.location.pathname !== pathname) {
      // When the route is changed, change the current menu selected key value
      this.handleSetSelectedKeys(nextProps.location.pathname);
    }
  }

  handleSetSelectedKeys(pathname) {
    // /admin = ["/","admin"]
    // Split the routing address into an array based on '/'
    const temp = pathname.split("/");
    // If the length of the array is less than 2, it means only the root path/, set to Home.
    //Otherwise, take the second value in the array
    const key = temp && temp.length < 2 ? "home" : temp[1];
    this.setState({
      selectedKeys: [key],
    });
  }

  handleClickMenu = ({ key }) => {
    // Exit
    if (key === "logout") {
      window.localStorage.clear();
      this.props.history.push("/login");
    }
  };

  menu = (
    <Menu onClick={this.handleClickMenu}>
      <Menu.Item key="logout">
        <span>Sign Out</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <nav className={style.header}>
        <a className={style.logo} href="https://github.com/zee123123">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-github"
            viewBox="0 0 24 24"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
        {/* // Menu Container */}
        <Menu
          className={style["menu-left"]}
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          selectedKeys={this.state.selectedKeys}
        >
          {menus
            .filter(
              ({ isAuthority }) =>
                !(isAuthority && localStorage.key && localStorage.email)
            )
            .map(({ key, path, name, className }) => (
              <Menu.Item key={key} className={className}>
                <Link to={path}>{name}</Link>
              </Menu.Item>
            ))}
        </Menu>
        {/* User email and Exit*/}
        {localStorage.email && localStorage.key && (
          <Dropdown overlay={this.menu} className={style["dropdown-menu"]}>
            <a className="ant-dropdown-link">
              <span className={style.email}>{localStorage.email}</span>{" "}
              <Icon className={style.icon} type="down" />
            </a>
          </Dropdown>
        )}
      </nav>
    );
  }
}

// GitHub SVG:
/* 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
fill="currentColor" class="bi bi-github" viewBox="0 0 24 24">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg> 
*/

// Another SVG:
// xmlns="http://www.w3.org/2000/svg"
// width="24"
// height="24"
// viewBox="0 0 24 24"
// fill="none"
// stroke="currentColor"
// strokeWidth="2"
// strokeLinecap="round"
// strokeLinejoin="round"
// className="d-block mx-auto"
// >
// <circle cx="12" cy="12" r="10" />
// <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
// <line x1="9.69" y1="8" x2="21.17" y2="8" />
// <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
// <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
// <line x1="14.31" y1="16" x2="2.83" y2="16" />
// <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
