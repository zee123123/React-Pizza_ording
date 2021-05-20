import React from "react";
import { Route, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import { connect } from "dva";
import NoMatch from "../components/NoMatch";

// export default function SubRoutes(route) {
//   console.log(route);
//   return (
//     <Route
//       render={props => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }

// Solve the problem of loading dynamic routing
const dynamicCom = (app, models, component, routes, isAuthority, userInfo) =>
  dynamic({
    app,
    models: () => models,
    component: () =>
      component().then((res) => {
        // console.log(isAuthority);
        if (isAuthority) {
          // Judge if userInfo.id has some content
          if (!localStorage.key || !localStorage.email) {
            return () => <Redirect to="/login" />;
          }
        }
        const Component = res.default || res;
        return (props) => <Component {...props} app={app} routes={routes} />;
      }),
  });

function SubRoutes({ routes, component, app, model, isAuthority, userInfo }) {
  // console.log('subRoutes.js');

  return (
    <Route
      component={dynamicCom(
        app,
        model,
        component,
        routes,
        isAuthority,
        userInfo
      )}
    />
  );
}

// Redirected wrapper components
export function RedirectRoute({ routes, from, exact }) {
  const routeR = routes.filter((item) => {
    return item.redirect;
  });

  const to = routeR.length ? routeR[0].path : routes[0].path;
  return <Redirect exact={exact} from={from} to={to} />;
}

// NoMatchRoute
export function NoMatchRoute({ status = 404 }) {
  return <Route render={(props) => <NoMatch {...props} status={status} />} />;
}

// Connect
export default connect(({ global }) => ({
  userInfo: global.userInfo,
}))(SubRoutes);
