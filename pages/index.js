import Link from 'next/link'
import Router from 'next/router'

import {Button} from 'antd'

export default class Index extends React.Component{
    goToA = () => {
        Router.push({
            pathname:'/a',
            query:{
                id:222
            }
        },'/a/222')
    }

    render(){
        return <div>Index 首页
            <br/>
            声明式导航:
            {/* <Link href="/a?id=111"> */}
            <Link href="/a?id=111" as="/a/111">
                <Button type="primary">跳转A</Button>
            </Link><br/><br/><br/>
            编程式导航：
            <Button onClick={this.goToA}>跳转到A</Button>
        </div>
    }
} 