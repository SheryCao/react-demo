import { getLocalStore } from "../utils";
const home = (state = 'shery', action) => {
    switch (action.type) {
        case "CHANGE_NAME":
            return 'jerry'
        default:
            return state;
    }
}

const list = (state = [{ title: '数学', price: 20 }], action) => {
    switch (action.type) {
        case "ADD_LIST":
            return [
                ...state,
                action.add_obj
            ]
        default:
            return state;
    }
}
const inital = {
    isLogin: getLocalStore("sessionid") ? true : false,
    loading: false,
    msg:''
}
const login = (state = inital, action) => {
  switch (action.type) {
    case "login_start":
      return {
        isLogin: false,
        loading: true,
        msg: "",
      };
    case "login_suc":
      return {
        isLogin: true,
        loading: false,
        msg: "",
      };
    case "login_fail":
      return {
        isLogin: false,
        loading: false,
        msg: "登录失败",
      };
    default:
      return state;
  }
};

export { home, list, login } ;