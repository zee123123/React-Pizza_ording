import React, { Component } from "react";
import { Tabs } from "antd";
import style from "./index.scss";
import { Switch } from "dva/router";
import SubRoutes, { RedirectRoute } from "../../utils/SubRoutes";

const { TabPane } = Tabs;

export default class index extends Component {
  // click tab to switch route
  handleChangeTab = (key) => {
    // console.log(key);
    // window.location.href = '/#' + key;
    // console.log(this);
    if (this.props.location.pathname !== key) {
      this.props.history.push(key);
    }
  };
  render() {
    const { routes, app } = this.props;
    return (
      <div className={style.about}>
        <Tabs
          className={style.tabs}
          tabPosition={"left"}
          activeKey={this.props.location.pathname}
          onChange={this.handleChangeTab}
        >
          <TabPane tab="History" key="/about/history" />
          <TabPane tab="Contact" key="/about/contact" />
          <TabPane tab="Guide" key="/about/orderingguide" />
          <TabPane tab="Delivery" key="/about/delivery" />
        </Tabs>
        <div className={style.routes}>
          {/*second routing */}
          <Switch>
            {routes.map((route, i) => (
              // Calling wrapper components
              <SubRoutes key={i} {...route} app={app} />
            ))}

            <RedirectRoute exact={true} from={"/about"} routes={routes} />
          </Switch>
        </div>
      </div>
    );
  }
}
