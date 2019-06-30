import App,{Container} from 'next/app'
import Link from 'next/link'

export default class MyApp extends App{
    render(){
        console.log('---app---render---')
        // 页面 和 页面的属性
        const {Component,pageProps} = this.props

        return <Container>
            <Link href="/index"><a>Index</a></Link>
            <Link href="/repos"><a>Repos</a></Link>

            <Component {...pageProps}/>

            <style jsx>{`
                a {
                    display:inline-block;
                    padding:20px;
                }
            `}</style>
        </Container>
    }
}