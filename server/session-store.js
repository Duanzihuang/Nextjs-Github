function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  // 根据 sid 从session中获取内容
  async get(sid) {
    console.log(`get session is ${sid}`)
    const id = getRedisSessionId(sid)
    const result = await this.client.get(id)
    try {
      return JSON.parse(result)
    } catch (error) {
      console.error(error)
    }
  }

  // 根据 sid 往session中设置内容
  async set(sid, sess, time) {
    console.log(`set session is ${sid}`)
    const id = getRedisSessionId(sid)

    if (typeof time === 'number') {
      time = Math.ceil(time / 1000)
    }

    try {
      const sessStr = JSON.stringify(sess)
      if (time) {
        await this.client.setex(id, time, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 从reids当中删除某个session
  async destroy(sid){
    console.log(`destroy session is ${sid}`)
    const id = getRedisSessionId(sid)

    await this.client.del(id)
  }
}

module.exports = RedisSessionStore
