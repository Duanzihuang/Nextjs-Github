const axios = require('axios')
const config = require('../config.js')

const {get_token_url,client_id,client_secret} = config.github

module.exports = server => {
    server.use(async (ctx,next) => {
        if (ctx.path === '/auth'){
            // 获取到code
            const code = ctx.query.code

            if (code) {
                // 发送请求，获取token
                const result = await axios({
                    method:'POST',
                    url:get_token_url,
                    data:{
                        client_id,
                        client_secret,
                        code
                    },
                    headers:{
                        Accept:'application/json'
                    }
                })

                if (result.status === 200 && (result.data && !result.data.error)){
                    ctx.session.githubAuth = result.data

                    const {access_token,token_type} = result.data

                    console.log(result.data)
                    // 获取用户信息
                    const userInfoRes = await axios({
                        method: 'GET',
                        url: 'https://api.github.com/user',
                        headers: {
                            Authorization: `${token_type} ${access_token}`,
                        }
                    })
                    // 存储到session中
                    ctx.session.userInfo = userInfoRes.data

                    ctx.redirect('/user')
                } else {
                    const errorMsg = result.data && result.data.error
                    ctx.body = `request token failed ${errorMsg}`
                }
            } else {
                ctx.body = 'code is empty'
            }
        } else {
            await next()
        }
    })
}