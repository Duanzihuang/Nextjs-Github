# Nextjs-Github
Nextjs构建的服务端渲染项目-Github

### Redis

> 内存存储数据库，通过key、value的形式存储

> 命令行操作

```
启动服务端【默认】
	redis-server
	
启动服务端【指定配置文件】
	redis-server 配置文件名称
	
启动客户端【默认端口6379】
	redis-cli
	
启动客户端【其它端口】
	redis-cli -p 6377
	
密码登录
	auth 密码
	
存值
	set key value
	
取值
	get key
	
存值并且设置有效期
	setex key 有效时间【单位:秒】 value
	
查看所有的keys
	keys *
	
删除某个key
	del key
```

> Node中操作redis

```
ioredis
	https://www.npmjs.com/package/ioredis
```

### NextJS支持导入Css【集成antd】

```
1、安装包 @zeit/next-css
	https://www.npmjs.com/package/@zeit/next-css
	
2、在根目录创建 next.config.js 配置文件，编写代码

3、安装 antd babel-plugin-import

4、项目根目录创建 .babelrc 配置文件，写好配置

5、在pages目录下创建 _app.js 写好代码
	别忘记在这里引入 antd 的样式
```

### NextJS 路由

```
声明式导航
	Link === import Link from 'next/link'
	Link里面包含的必须是唯一的子节点
	
编程式导航
	Router === import Router from 'next/link'
	Router.push('路径')
	
动态路由
	只能通过query
	path?id=xxx
	
	新页面如何获取参数
		withRouter包裹组件导出，那么在组件的props中就可以拿到router对象，通过router对象的query属性		可以获取到值 router.query.xxx
		import {withRouter} from 'next/router'
		
路由映射
	Link的as属性 或是 Router的第二个参数
	
	更改路由的显示方式，将之前的 path?id=1 显示成 path/1
	
	Router.push({
        pathname:'/test',
        query:{
            id:2
        }
	},'/test/2')
	
404处理
	当使用Link的as映射之后，发现强制刷新会报404的错误，这是因为我们的pages目录下，并没有
	该页面，所以会报错，解决办法是：自己在后台【server.js中】实现对路径的处理
```

