import React from "react";
import { connect } from "dva";
import { Layout } from "antd";

// Import the components needed for routing
import { Switch } from "dva/router";
import SubRoutes, { RedirectRoute, NoMatchRoute } from "../utils/SubRoutes";

import NavBar from "./NavBar";
// import Home from './Home';
// import About from './About';
// import Admin from './Admin';
// import Menus from './Menus';
// import Login from './User/Login';
// import Register from './User/Register';
import styles from "./IndexPage.scss";

const { Header, Content } = Layout;

function IndexPage(props) {
  // console.log('IndexPage.js');

  // console.log(props);
  const { routes, app } = props;
  // console.log(routes);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar {...props} />
      </Header>

      <Content className={styles.content}>
        {/* Level 1 Routing */}
        <Switch>
          {/* <Route path="/home" component={Home} />
          <Route path="/menus" component={Menus} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> */}
          {routes.map((route, i) => (
            // Calling wrapper components
            <SubRoutes key={i} {...route} app={app} />
          ))}
          {/*  
              Redirection method.
              If there is no redirect: true in the route configuration (redirect by circular rendering)
              then the first route is the redirect route by default.
              <Redirect exact from={"/"} to={routes[0].path} /> 
             */}
          {/* <Redirect to="/home" /> */}
          <RedirectRoute exact={true} from={"/"} routes={routes} />
          {/* If the input link does not exist, jump to the NoMatch component */}
          <NoMatchRoute />
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
