const withCss = require('@zeit/next-css')
const config = require('./config')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

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
        // staticFolder:'/static'
        GITHUB_OAUTH_URL,
        OAUTH_URL:`${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`
    }
})