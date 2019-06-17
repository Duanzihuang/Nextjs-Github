import { withRouter } from 'next/router'
import Link from 'next/link'
// import moment from 'moment'

class A extends React.Component{
    render(){
        const {name,age,time} = this.props
        return <div><Link href="#test"><a>i am a ---${this.props.router.query.id}---{name}---{age}---{time}</a></Link>
            <span>这是A页面</span>
        </div>
    }
}

// A.getInitialProps = () => {
//     return {
//         name:'张三丰',
//         age:666
//     }
// }

A.getInitialProps = async () => {
    console.log("-------------------------")
    const moment = await import('moment')

    const promise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                name:'张三丰',
                age:666,
                time:moment.default(Date.now() - 60 * 1000).fromNow()
            })
        }, 0);
    })

    return await promise
}

export default withRouter(A)