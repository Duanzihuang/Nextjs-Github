import {connect} from 'react-redux'
import getConfig from 'next/config'
import {Icon,Button,Tabs} from 'antd'
import {cacheArray} from '../lib/repo-basic-cache'
import Lru from 'lru-cache'
const { TabPane } = Tabs
import {useCallback,useEffect} from 'react'
const api = require('../lib/api')

const {publicRuntimeConfig} = getConfig()

// 导入子组件
import Repo from '../components/Repo'

const isServer = typeof window === 'undefined'
const cache = new Lru({
    maxAge:1000 * 60 * 60
})

const Index = ({userRepos,userStaredRepos,user}) => {
    useEffect(() => {
        if (!isServer){
            cache.set('userRepos',userRepos)
            cache.set('userStaredRepos',userStaredRepos)

            cacheArray(userRepos)
            cacheArray(userStaredRepos)
        }
    })

    // 判断是否登录，如果没有登录，则登录
    if (!user || !user.id){
        return <div className="root">
            <p>亲，您还没有登录哦~</p>
            <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>点击登录</Button>
            <style jsx>{`
                .root{
                    height:400px;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content: center;
                }
            `}</style>
        </div>
    }

    // 事件处理
    const handleTabChange = () => {

    }

    return <div className="root">
        {/* 用户信息部分 */}
        <div className="user-info">
            <img src={user.avatar_url} className="avatar"/>
            <span className="login">{user.login}</span>
            <span className="name">{user.name}</span>
            <span className="bio">{user.bio}</span>
            <p className="email">
                <Icon type="mail" style={{marginRight:10}}/>
                <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
        </div>
        {/* 仓库部分 */}
        <div className="user-repos">
            <Tabs defaultActiveKey="1" onChange={handleTabChange} animated={false}>
                <TabPane tab="你的仓库" key="1">
                    {userRepos.map(item => {
                        return <Repo key={item.id} repo={item}/>
                    })}
                </TabPane>
                <TabPane tab="你关注的仓库" key="2">
                    {userStaredRepos.map(item => {
                        return <Repo key={item.id} repo={item}/>
                    })}
                </TabPane>
            </Tabs>
        </div>
        <style jsx>{`
            .root {
                display: flex;
                align-items: flex-start;
                padding: 20px 0;
            }   
            .user-info {
                width: 200px;
                margin-right: 40px;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
            }
            .login {
                font-weight: 800;
                font-size: 20px;
                margin-top: 20px;
            }
            .name {
                font-size: 16px;
                color: #777;
            }
            .bio {
                margin-top: 20px;
                color: #333;
            }
            .avatar {
                width: 100%;
                border-radius: 5px;
            }
            .user-repos{
                flex-grow: 1;
            }
        `}</style>
    </div>
}

Index.getInitialProps = async ({ctx,reduxStore}) => {
    console.log("---Index---")

    console.log("1111111111111")

    const user = reduxStore.getState().user
    if (!user || !user.id){
        return {
            isLogin:false
        }
    }

    // 先从缓存中去取
    if (!isServer){
        if (cache.get('userRepos') && cache.get('userStaredRepos')){
            return {
                userRepos:cache.get('userRepos'),
                userStaredRepos:cache.get('userStaredRepos')
            }
        }
    }

    // 获取用户自己的仓库
    const userRepos = await api.request({
        url:'/user/repos'
    },ctx.req,ctx.res)

    // 获取用户关注的仓库
    const userStaredRepos = await api.request({
        url:'/user/starred'
    },ctx.req,ctx.res)

    return {
        userRepos:userRepos.data,
        userStaredRepos:userStaredRepos.data
    }
}

export default connect(state => {
    return {
        user:state.user
    }
})(Index)