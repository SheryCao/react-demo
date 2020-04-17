import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import API from "../server/api"
import {setLocalStore} from "../utils"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      username: "18358128095",
      password: "123456ccc",
    };
  }
  changeInput = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };
  changeUser(e) {
    this.setState({
      username: e.target.value,
    });
  }
  changePass(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleLogin = async () => {
    const payload = {
      username: this.state.username,
      password: this.state.password,
    };
    const data = await API.login(payload);
  };

  handleLoginAsync = () => {
      this.props.AsyncLogin({
          username: this.state.username,
          password: this.state.password
      })
  }
  render() {
    return (
      <div>
        <h2>hello {this.state.name}!</h2>
        <div>
          <input
            type="text"
            placeholder="请输入您的修改的名字"
            onChange={(e) => this.changeInput(e)}
          />
          <button onClick={this.props.changeName}>修改名称</button>
        </div>
        <div><Link to="/user">个人中心</Link></div>
        <div>
          <span>用户名：</span>
          <input
            type="text"
            value={this.state.username}
            onChange={(e) => this.changeUser(e)}
          />
        </div>
        <div>
          <span>密码：</span>
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.changePass(e)}
          />
        </div>
        <div>
          <button
            disabled={this.props.login.loading}
            onClick={() => this.handleLogin()}
          >
            {this.props.login.loading ? "登录中..." : "登录"}
          </button>
          <button
            disabled={this.props.login.loading}
            onClick={() => this.handleLoginAsync()}
          >
            {this.props.login.loading ? "登录中..." : "async登录"}
          </button>
        </div>
        {this.props.list.map((i, l) => (
          <p key={l}>
            {i.title}---￥{i.price}
          </p>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        name: state.home,
        list: state.list,
        login: state.login
    }
}
const mapDispatchToProps = {
  changeName: () => ({ type: "CHANGE_NAME" }),
  AsyncLogin: (...args) => {
    return async dispatch => {
        dispatch({ type: "login_start"});
        const data = await API.login(...args);
        setTimeout(() => {
            if (data.code == 0) {
              dispatch({ type: "login_suc" });
              setLocalStore("sessionid", data.data.sessionid)
            } else {
              dispatch({ type: "login_fail" });
            }
        }, 3000);
    }
  },
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)