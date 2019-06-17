const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV != 'production'
const app = next({dev})

// 可以处理http请求
const handle = app.getRequestHandler()

// 等服务端ssr渲染完毕之后【编译好pages下面的所有页面】
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    // 处理 params的路径
    router.get('/a/:id',async ctx => {
        const id = ctx.params.id

        await handle(ctx.req,ctx.res,{
            pathname:'/a',
            query:{
                id
            }
        })

        // ctx.response = false
    })

    server.use(router.routes())

    server.use(async (ctx,next) => {
        await handle(ctx.req,ctx.res)
        ctx.response = false
    })

    server.listen(3000,() => {
        console.log("start ok")
    })
})