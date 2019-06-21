import {createStore,combineReducers,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import countReducer from './reducers/countReducer'
import userReducer from './reducers/userReducer'

// 初始值
const countInitial = {
    count:3
}
const userInitial = {
    username:'duanzihuang'
}

export default initialState => {
    return createStore(combineReducers({
        counter:countReducer,
        user:userReducer
    }),Object.assign({},{ // 给 reducers 赋初始值
        counter:countInitial,
        user:userInitial
    },initialState),composeWithDevTools(applyMiddleware(thunk)))
}