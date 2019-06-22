import {useState,useReducer,useEffect,useRef,useContext,memo,useMemo,useCallback} from 'react'

const countReducer = (state,action) => {
    switch (action.type) {
        case 'add':
            return state + 1
            break;

        case 'minus':
                return state - 1
                break;

        default:
            return state
            break;
    }
}

import MyContext from '../lib/my-context'

function MyCount(){
    // 给count设置初始值 0
    // const [count,setCount] = useState(0)

    const [count,dispatchCount] = useReducer(countReducer,0)
    const [name,setName] = useState('duanzihuang')

    // Context Hooks
    const context = useContext(MyContext)

    const inputRef = useRef()

    // 当组件的内容渲染完毕之后，会调用该回调函数，在里面可以处理逻辑
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCount(c => c + 2)
    //     },1000)

    //     return () => clearInterval(interval)
    // },[])

    // useEffect(()=>{
    //     console.log('effect invoked')
    //     // console.log(inputRef)

    //     return () => console.log('effect detected')
    // },[count])

    // useEffect(()=>{
    //     console.log('effect invoked')
    //     console.log(inputRef)

    //     return () => console.log('effect detected')
    // },[name])

    const config = useMemo(() => ({
        text:`count is ${count}`,
        color: count > 3 ? 'red' : 'blue'
    }),[count])

    // useRef 可以解决闭包作用域的问题
    const countRef = useRef() // useRef这个创建的对象是不会变的
    countRef.current = count
    const handleAlertCount =  () => {
        setTimeout(() => {
            // alert(count)
            alert(countRef.current)
        }, 2000);
    }

    //const handleButtonClick = useCallback(() => dispatchCount({type:'add'}),[])
    const handleButtonClick = useMemo(() => () => dispatchCount({type:'add'}),[])

    return <div>
        <input value={name} onChange={(e)=>{setName(e.target.value)}} ref={inputRef}/>
    
        {/* <button onClick={() => {dispatchCount({type:'add'})}}>{count}</button>
        <p>{context}</p> */}

        <Child config={config}
            onButtonClick={handleButtonClick}
        />
        <br/>
        <button onClick={handleAlertCount}>alert count</button>
    </div>
}

const Child = memo(function Child({onButtonClick,config}){
    console.log('child render')

    return (
        <button onClick={onButtonClick} style={{color:config.color}}>
            {config.text}
        </button>
    )
})

export default MyCount