async function test(){
    const Redis = require('ioredis')

    const redis = new Redis({
        port:6377, // 端口
        password:123456 // 密码
    })

    redis.set('c',666)

    redis.setex('d',10,888)

    const allKeys = await redis.keys('*')
    console.log(allKeys)

    console.log(await redis.get('c'))
    console.log(await redis.get('d'))
}

test()