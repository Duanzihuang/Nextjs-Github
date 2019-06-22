import {useEffect} from 'react'
import axios from 'axios'

export default () => {
    // 视图渲染完毕之后执行
    useEffect(() => {
        axios.get('/api/user').then(res => console.log(res.data))
    },[])

    return <div>用户组件...</div>
}