import React from 'react'
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import {Provider, connect} from "react-redux"
import store from "./store"
import Home from './pages/home';
import User from "./pages/user";
import Login from "./pages/login";

function Routers(){
    return (
      <div>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/user" exact component={User} />
          <Route path="/login" exact component={Login} />
        </BrowserRouter>
      </div>
    );
}
export default () => {
    return (
        <div>
            <Provider store={store}>
                <Routers />
            </Provider>
        </div>
    )
}
// <PrivateRoute path="" component={} />
const PrivateRoute = connect(
    state => ({
        isLogin: state.login.isLogin
    })
)(PrivateRouteNew);
function PrivateRouteNew({component:  Comp, isLogin, ...rest} ) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isLogin ? (
            <Comp />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { redirect: props.location.pathname },
              }}
            />
          )
        }
      />
    );
}