import App,{Container} from 'next/app'

// 导入antd的样式
import 'antd/dist/antd.css'

// 导入Layout组件
import Layout from '../components/Layout'

// import store from '../store'
import {Provider} from 'react-redux'

import ReduxHoc from '../lib/redux-hoc'

class MyApp extends App {
    state = {
        context:'val'
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
                    <Layout>
                        <Component {...pageProps}></Component>
                    </Layout>
                </Provider>
            </Container>
        )
    }
}

export default ReduxHoc(MyApp)