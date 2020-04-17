import React from 'react'
import CReducer from '../store/counter.reducer'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
// 创建store
const store = createStore(CReducer);
// 映射state和dispatch
const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({
    addNum: () => dispatch({ type: 'Add' }),
    minusNum: () => dispatch({ type: 'Minus' })
})
// connect连接react和redux
const AppNew = connect(
    mapStateToProps,
    mapDispatchToProps
)( (props) => {
    return (
        <div>
            <h1>计数器{props.state}</h1>
            <div>
                <button onClick={props.addNum}>+</button>
                <button onClick={props.minusNum}>-</button>
            </div>
        </div>
    )
})
// 利用context数据传递
export default () => {
    return (
        <Provider store={store}>
            <AppNew></AppNew>
        </Provider>
    )
}
