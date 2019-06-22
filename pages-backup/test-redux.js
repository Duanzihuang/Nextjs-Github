import {connect} from 'react-redux'
import {add,asyncAdd,changeName} from '../store/actions/actionCreator'

const TestRedux = ({count,username,changeName,add}) => {
    return <div>
        count:{count}&nbsp;&nbsp;username:{username}<br/>
        <input value={username} onChange={(e) => {changeName(e.target.value)}}/>
        <button onClick={() => {add(3)}}>add count</button>
    </div>
}

export default connect(state=> {
    return {
        count:state.counter.count,
        username:state.user.username
    }
},dispatch=>{
    return {
        // add : num => asyncAdd(num),
        add : num => dispatch(add(num)),
        changeName : name => dispatch(changeName(name))
    }
})(TestRedux)