import {createStore,combineReducers,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './reducers/userReducer'

// 初始值
const userInitial = {
    user:{}
}

export default initialState => {
    return createStore(combineReducers({
        user:userReducer
    }),Object.assign(
        {},
        { // 给 reducers 赋初始值
            user:userInitial
        },
        initialState
    ),composeWithDevTools(applyMiddleware(thunk)))
}