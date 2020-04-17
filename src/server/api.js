import Axios from './conf'
/*
* 统一接口
*/ 
const API = {
    login(payload){
        return Axios.post("/login", { ...payload })
    },
    getUserInfo(){
        return Axios.post('/mine')
    }
}

export default API;