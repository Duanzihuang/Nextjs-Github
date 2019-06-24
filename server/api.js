
const axios = require('axios')

// const github_base_url = 'https://api.github.com'

const {requestGithub} = require('../lib/api')

module.exports = server => {
    server.use(async (ctx,next) => {
        const path = ctx.path
        const method = ctx.method
        if (path.startsWith('/github/')){
            console.log("3333333333333333")

            const url = `${ctx.url.replace('/github/','/')}`
            const headers = {}
            // 如果登录过了，则获取access_token
            if (ctx.session.githubAuth){
                const {token_type,access_token} = ctx.session.githubAuth
                headers.Authorization = `${token_type} ${access_token}`
            }

            console.log(url,method)
            const result = await requestGithub(url,method,{},headers)

            ctx.status = result.status
            ctx.body = result.data

            // const url = `${github_base_url}${ctx.url.replace('/github/','/')}`
            // const headers = {}
            // // 如果登录过了，则获取access_token
            // if (ctx.session.githubAuth){
            //     const {token_type,access_token} = ctx.session.githubAuth
            //     headers.Authorization = `${token_type} ${access_token}`
            // }

            // axios({
            //     url,
            //     method,
            //     headers
            // }).then(res => {
            //     if (res.status === 200){
            //         ctx.set('Content-Type', 'application/json')
            //         ctx.body = res.data
            //     } else {
            //         ctx.body = {
            //             fail:true
            //         }
            //         ctx.set('Content-Type', 'application/json')
            //     }
            // }).catch(err => {
            //     console.log(err)
            //     ctx.body = {
            //         fail:true
            //     }
            //     ctx.set('Content-Type', 'application/json')
            // })
        } else {
            await next()
        }
    })
}