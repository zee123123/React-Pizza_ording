import React, { Component } from "react";
import { Link, Switch } from "dva/router";
import styles from "./TabPane.scss";
import SubRoutes, { RedirectRoute } from "../../utils/SubRoutes";

export default class index extends Component {
  render() {
    const { routes, app } = this.props;
    return (
      <div className={styles.tabpane}>
        <p className={styles.title}>Contact Me</p>
        <div className={styles.content}>
          <Link to="/about/contact/phone">Phone</Link>
          <Link to="/about/contact/address">Address</Link>
        </div>

        <div className={styles.info}>
          {/* Third Level Routing */}
          <Switch>
            {routes.map((route, i) => (
              // Calling wrapper components
              <SubRoutes key={i} {...route} app={app} />
            ))}

            <RedirectRoute
              exact={true}
              from={"/about/contact"}
              routes={routes}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
