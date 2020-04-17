import React, { useState } from "react";
import {connect} from "react-redux"
import { setLocalStore } from "../utils";
import {Redirect} from "react-router-dom"
import API from "../server/api";

export default connect(
  (state) => ({
    isLogin: state.login.isLogin,
    loading: state.login.loading
  }),
  {
    handleLogin: (payload, redirect) => {
      return async (dispatch) => {
        dispatch({ type: "login_start" });
        const data = await API.login(payload);
        setTimeout(() => {
          if (data.code == 0) {
            dispatch({ type: "login_suc" });
            setLocalStore("sessionid", data.data.sessionid);
            return <Redirect to={redirect} />;
          } else {
            dispatch({ type: "login_fail" });
          }
        }, 3000);
      };
    },
  }
)(({ isLogin, loading, handleLogin, location }) => {
  const [username, getUsername] = useState("18358128095");
  const [password, getPassword] = useState("123456ccc");
  const redirect = location.state.redirect || "/";
  if (isLogin) {
    return <Redirect to={redirect} />;
  }
  return (
    <div>
      <input
        type="text"
        placeholder="用户名"
        value={username}
        onChange={(e) => getUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => getPassword(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={() => handleLogin({ username, password }, redirect)}
      >
        {loading ? "登录中..." : "登录"}
      </button>
    </div>
  );
});

