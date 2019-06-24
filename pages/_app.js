import App,{Container} from 'next/app'

// 导入antd的样式
import 'antd/dist/antd.css'

// 导入相关组件
import Layout from '../components/Layout'
import PageLoading from '../components/PageLoading'

// import store from '../store'
import {Provider} from 'react-redux'

import ReduxHoc from '../lib/redux-hoc'

// 导入路由
import Router from 'next/router'
// import Link from 'next/link'

// 导入axios
import axios from 'axios'

class MyApp extends App {
    state = {
        context:'val',
        isLoading:false
    }

    startLoading = () => {
        this.setState({
            isLoading:true
        })
    }

    stopLoading = () => {
        this.setState({
            isLoading:false
        })
    }

    componentDidMount(){
        Router.events.on('routeChangeStart',this.startLoading)
        Router.events.on('routeChangeComplete',this.stopLoading)
        Router.events.on('routeChangeError',this.stopLoading)
    }

    componentWillUnmount(){
        Router.events.off('routeChangeStart',this.startLoading)
        Router.events.off('routeChangeComplete',this.stopLoading)
        Router.events.off('routeChangeError',this.stopLoading)
    }

    // 获取全局性的数据，比如redux的数据
    // Component 就是每个pages下面的每个页面
    /* 如果重写了该方法，需要先调用页面的getInitialProps，拿到结果，然后在
        render函数中渲染该页面的时候，作为参数传递进去
    */
    static async getInitialProps(ctx){
        console.log('app init')
        
        const {Component} = ctx
        let pageProps
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps
        }
    }

    render(){
        // Component 就是每个pages下面的每个页面
        const {Component,pageProps,reduxStore} = this.props
        // console.log(Component)
        return (
            <Container>
                <Provider store={reduxStore}>
                    {this.state.isLoading ? <PageLoading /> : null}
                    <Layout>
                        {/* <Link href="/"><a>Index</a></Link>
                        <Link href="/detail"><a>Detail</a></Link> */}
                        <Component {...pageProps}></Component>
                    </Layout>
                </Provider>
            </Container>
        )
    }
}

export default ReduxHoc(MyApp)