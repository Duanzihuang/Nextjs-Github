import App,{Container} from 'next/app'

// 导入antd的样式
import 'antd/dist/antd.css'

// 导入Layout组件
import Layout from '../components/Layout'

// 导入MyContext
import MyContext from '../lib/my-context'

class MyApp extends App {
    state = {
        context:'val'
    }

    // 获取全局性的数据，比如redux的数据
    // Component 就是每个pages下面的每个页面
    /* 如果重写了该方法，需要先调用页面的getInitialProps，拿到结果，然后在
        render函数中渲染该页面的时候，作为参数传递进去
    */
    static async getInitialProps({Component,ctx}){
        console.log('app init')
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
        const {Component,pageProps} = this.props
        // console.log(Component)
        return (
            <Container>
                <Layout>
                    <MyContext.Provider value={this.state.context}>
                        <Component {...pageProps}></Component>
                        <button onClick={() => {this.setState({context:`${this.state.context} 111`})}}>update context</button>
                    </MyContext.Provider>
                </Layout>
            </Container>
        )
    }
}

export default MyApp