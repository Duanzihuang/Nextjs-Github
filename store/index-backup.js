import {createStore,combineReducers,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import countReducer from './reducers/countReducer'
import userReducer from './reducers/userReducer'

// 初始值
const countInitial = {
    count:0
}
const userInitial = {
    username:'duanzihuang'
}

const store = createStore(combineReducers({
    counter:countReducer,
    user:userReducer
}),{ // 给 reducers 赋初始值
    counter:countInitial,
    user:userInitial
},composeWithDevTools(applyMiddleware(thunk)))

export default store