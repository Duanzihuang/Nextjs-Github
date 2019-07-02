const axios = require('axios')

const github_base_url = "https://api.github.com"

async function requestGithub(url,method,data,headers){
    console.log("sssssssssssssss",url)
    return await axios({
        url:`${github_base_url}${url}`,
        method,
        data,
        // headers
    })
}

// 判断是否是服务端
const isServer = typeof window === 'undefined'
async function request({url,method='GET',data = {}},req,res){
    if (!url){
        throw Error('url cannot null')
    }

    if (isServer){ // 服务端
        console.log("11111111111111")
        const session = req.session
        const headers = {}
        if (session && session.githubAuth) {
            const {access_token,token_type} = session.githubAuth
            headers['Authorization'] = `${token_type} ${access_token}`
        }

        return await requestGithub(url,method,data,headers)
    } else { // 浏览器端
        console.log("2222222222222")
        return await axios({
            url:`/github${url}`,
            method,
            data
        })
    }
}

module.exports  = {
    requestGithub,
    request
}