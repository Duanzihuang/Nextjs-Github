const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

// module.exports = withCss({})
module.exports = withCss({
    env:{
        customKey:'val'
    },
    // 服务端渲染才能获取的配置
    serverRuntimeConfig:{
        mySecret:'secret',
        secondSecret:process.env.customKey
    },
    // 服务端和客户端渲染都可以获取的配置
    publicRuntimeConfig:{
        staticFolder:'/static'
    }
})