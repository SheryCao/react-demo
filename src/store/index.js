import {createStore, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import { home, list, login } from './reducer'
const store = createStore(
    combineReducers({
        home,
        list,
        login
    }), 
    applyMiddleware(thunk)
)

export default store;