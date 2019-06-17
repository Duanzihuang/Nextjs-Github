import {Button} from 'antd'
import Link from 'next/link'
import Router from 'next/router'

export default class Layout extends React.Component{
    goToA = () => {
        Router.push({
            pathname:'/a',
            query:{
                id:222
            }
        },'/a/222')
    }

    render(){
        const {children} = this.props
        return <div>
            <br/>
            声明式导航:
            {/* <Link href="/a?id=111"> */}
            <Link href="/a?id=111" as="/a/111">
                <Button type="primary">跳转A</Button>
            </Link>
            编程式导航：
            <Button onClick={this.goToA}>跳转到A</Button>
            <br/><br/><br/>
            {children}
        </div>
    }
}