import React from 'react'

import createStore from '../store/index'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

// 获取或创建Store
function getOrCreateStore(initialState){
    if (isServer) {
        return createStore(initialState)
    }

    if (!window[__NEXT_REDUX_STORE__]){
        window[__NEXT_REDUX_STORE__] = createStore(initialState)
    }

    return window[__NEXT_REDUX_STORE__]
}

function ReduxHoc (Comp) {
    class ReduxHocComponent extends React.Component{
        constructor(props){
            super(props)
            
            // 初始化时创建一个reduxStore
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }

        render(){
            const {Component,pageProps,...rest} = this.props

            if (pageProps){
                pageProps.test = "mytest 123"
            }
    
            return <Comp reduxStore={this.reduxStore} Component={Component} pageProps={pageProps} {...rest}/>
        }
    }
    
    // 服务端渲染和客户端渲染的时候，都会执行到这里
    ReduxHocComponent.getInitialProps = async (ctx) => {
        const reduxStore = await getOrCreateStore()

        // 把创建的reduxStore存放在ctx上面
        ctx.reduxStore = reduxStore

        let appProps = {}
        if (typeof Comp.getInitialProps === 'function'){
            appProps = await Comp.getInitialProps(ctx)
        }

        return {
            ...appProps,
            initialReduxState:reduxStore.getState()
        }
    }

    return ReduxHocComponent
}

export default ReduxHoc