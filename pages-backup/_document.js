import Document,{Html,Head,Main,NextScript} from 'next/document'

// styled-components的使用
import {ServerStyleSheet} from 'styled-components'

class MyDocument extends Document{
    static async getInitialProps(ctx){
        // styled-components
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
            })

            const props = await Document.getInitialProps(ctx)
            
            return {
                ...props,
                styles:<>{props.styled}{sheet.getStyleElement()}</>
            }
        } finally {
            sheet.seal()
        }
    }

    render(){
        return <Html>
            <Head>
                {/* 不要在这里定义，这样就写死了，title应该每个页面都不一样才是 */}
                {/* <title>My App</title> */}
                <style>{`.test{color:red}`}</style>
            </Head>
            {/* <body className="test"> */}
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    }
}

export default MyDocument