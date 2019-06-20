const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')
const next = require('next')

const dev = process.env.NODE_ENV != 'production'
const app = next({dev})

// 可以处理http请求
const handle = app.getRequestHandler()

const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')

const redis = new Redis()

// 授权中间件
const auth = require('./server/auth')

// 等服务端ssr渲染完毕之后【编译好pages下面的所有页面】
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    // 设置session相关 & 集成session中间件
    server.keys = ['duanzihuang develop Github App']
    const SESSION_CONFIG = {
        key:'jid', // 浏览器cookies的key
        // maxAge:60 * 1000,
        store:new RedisSessionStore(redis)
    }

    server.use(session(SESSION_CONFIG,server))

    // 处理授权中间件
    auth(server)

    // 处理 params的路径
    router.get('/a/:id',async ctx => {
        const id = ctx.params.id

        await handle(ctx.req,ctx.res,{
            pathname:'/a',
            query:{
                id
            }
        })

        console.log('session is ',ctx.session)
        // ctx.response = false
    })

    // 处理 params的路径
    router.get('/api/user',async ctx => {
        const user = ctx.session.userInfo

        if (!user){
            ctx.status = 401
            ctx.body = 'Need Login'
        } else {
            ctx.body = user
            ctx.set('Content-Type','application/json')
        }
    })

    // 设置session
    router.get('/set/user',async ctx => {
        // 设置session
        ctx.session.user = {
            name:'duanzihuang',
            age:18
        }

        ctx.body = 'set session success'
    })

    router.get('/delete/user',async ctx => {
        // 清空session
        ctx.session = null

        ctx.body = 'delete session success'
    })

    server.use(router.routes())
    let index = 0
    server.use(async (ctx,next) => {
        ctx.cookies.set('id',index)
        index += 1
        await handle(ctx.req,ctx.res)
        ctx.respond = false
    })

    server.listen(3000,() => {
        console.log("start ok")
    })
})