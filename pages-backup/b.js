// styled-components的使用
import styled from 'styled-components'

import dynamic from 'next/dynamic'

const LazyLoad = dynamic(import('../components/LazyLoad'))

import getConfig from 'next/config'

const {serverRuntimeConfig,publicRuntimeConfig} = getConfig()

const Title = styled.h1`
    color:green;
    font-size:40px;
`

class B extends React.Component{
    render(){
        console.log(serverRuntimeConfig)
        console.log(publicRuntimeConfig)
        return (
            <>
                <div className="testB">测试B</div>
                <LazyLoad />
                <Title>this is title---{process.env.customKey}</Title>
                <style jsx>{`
                    .testB:{
                        color:blue
                    }
                `}</style>
            </>
        )
    }
}

export default B