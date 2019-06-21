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
		withRouter包裹组件导出，那么在组件的props中就可以拿到router对象，通过router对象的query属
		可以获取到值 router.query.xxx
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
	
Router钩子
	routeChangeStart
	routeChangeComplete
	routeChangeError
	beforeHistoryChange
	hashChangeStart
	hashChangeComplete
```

### getInitialProps

```
挂在`页面`上面的静态方法，nextjs的数据获取规范

作用：【完成客户端与服务端数据的同步】
	在页面中获取数据
	
	在App中获取全局数据
	
注意：
	只有pages目录下面的才起作用，其它文件夹下的不起作用
```

### 自定义App

```
相当于nuxt中的模板

作用：
	固定Layout
	保持一些公用的状态
		redux
		
	给页面传入一些自定义数据
	自定义错误处理
	
步骤：
	1、在pages目录下，创建一个_page.js的文件
	2、在 _app.js 中写了getInitialProps一定要注意，要获取页面的数据，并且在render中传递给页面
```

### 自定义Document

```
要点：
	1、只有在服务端渲染的时候才会被调用
	2、用来修改服务端渲染的文档内容
	3、一般用来配合第三方css-in-js方案使用
	
步骤：
	1、在 pages 目录下创建 _document.js
	2、导入相应的模块，重写Document的render 和 getInitialProps 方法
```

### 定义样式

```
https://github.com/zeit/styled-jsx

要点：
	next中不支持直接导入css，需要借助于第三方包 @zeit/next-css
	但是支持 css-in-js 的方式【style jsx】
	
语法：
	私有样式
        <style jsx>{`
            内容
        `}</style>

        注：样式是私有的
        
     全局样式
     	<style jsx global>{`
            内容
        `}</style>

        注：样式是全局的
        
注意：
	当页面销毁了，它的样式也会从head中移除，所以全局的样式如果写在某个页面中，当某个页面销毁了
	全局的样式也就没有啦，这个是比较好的样式会随着页面的出现而出现，销毁而销毁
```

### styled-component

```
https://www.styled-components.com/docs/advanced#nextjs

步骤：
	1、安装必要的包 styled-components babel-plugin-styled-components
	2、在 .babelrc 中配置 styled-components
	3、在 _document.js 中写好对应的代码
```

### LazyLoading

```
第三方包的懒加载
	在页面的 getInitialProps 中通过 import('包名') 进行懒加载
		const moment = await import('moment')
		
懒加载组件
	import dynamic from 'next/dynamic'
	const LazyLoad = dynamic(import('../components/LazyLoad'))
```

### next.config.js

```
配置的内容：
    env
        环境变量

    serverRuntimeConfig
        服务端渲染配置，只有在服务端渲染才能获取到的配置

    publicRuntimeConfig
        服务端和客户端渲染都可以获取的配置
	
获取next.config.js中配置的内容
	import getConfig from 'next/config'

	const {publicRuntimeConfig} = getConfig()
```

### Hooks

```
作用：
	让函数组件具有类组件的能力
	
用法：
	useState 给模型赋初始值
		// 赋初始值 count = 0
		const [count,setCount] = useState(0)
		
	useEffect 页面渲染完毕之后，会执行它的回调函数
		
		// 组件渲染完毕之后，调用该回调函数
		useEffect(() => {
            const interval = setInterval(() => {
                setCount(c => c + 2)
            },1000)
			
			// 组件销毁时候执行
            return () => clearInterval(interval)
        },[])
        
    useReducer 使用跟redux很像
    	见代码
    	const [count,dispatchCount] = useReducer(countReducer,0)
    	<button onClick={() => {dispatchCount({type:'add'})}}>{count}</button>
    
    useContext Context的hooks
    	见代码
    
    useRef ref的hooks
    	见代码
    	const inputRef = useRef()
    	<input ref={inputRef}/>
```

### Hooks优化

```
1、使用mome 把子组件包裹起来

2、把父组件中要传递给子组件的模型，使用useMemo包裹起来

3、在父组件中将传递给子组件的函数，使用useCallback包裹起来
```

Github Oauth授权

> 授权步骤：<https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/>

```
步骤：
	1、拿着 client_id scope 等请求 code【GET请求】
		https://github.com/login/oauth/authorize?client_id=xxx&scope=user,repo
	
	2、拿着 client_id client_secret code 请求access_token【POST请求】
		https://github.com/login/oauth/access_token
		
	3、拿着 access_token 请求具体API，比如获取用户信息【请求头中传递】
		请求头格式  Authorization : token xxxx
		
保证安全的策略
	1、一次性code
	2、id + secret
	3、redirect_uri
```

### nuxt中使用redis存储session信息

```
步骤:
	1、在项目根目录下创建一个文件
		server/session-store.js
		
	2、在session-store中创建一个类RedisSessionStore，并且导出
		class RedisSessionStore {
            constructor(){...}
            async get(sid){...}
            async set(sid,sess,time){...}
            async destory(sid){...}
		}
		export default RedisSessionStore
		
	3、在 入口 文件server.js中导入并且设置给 koa-session
		const SESSION_CONFIG = {
            key:'jid', // 浏览器cookies的key
            store:new RedisSessionStore(redis)
        }

        server.use(session(SESSION_CONFIG,server))
```

### Hoc

```
NextJS 通过Hoc 实现给组件添加额外的功能

定义：
	接收组件作为参数并返回新的组件

原理：
	传入一个组件，经过处理之后返回一个新的组件，该组件除了有之前组件的所有props还可以有额外的props
	例如 router-router-dom 的 withRouter  
    	react-redux 的 connect
```

