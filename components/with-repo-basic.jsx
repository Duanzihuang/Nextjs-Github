import {withRouter} from 'next/router'

import api from '../lib/api'

import {get} from '../lib/repo-basic-cache'

export default function(Comp,type='index'){
    function WithDetail({repoBasic,router,...rest}){
        // console.log(repoBasic)
        return <div>
            <Comp {...rest}/>
        </div>
    }

    WithDetail.getInitialProps = async context => {
        console.log("---WithDetail---init")
        const {ctx:{query:{owner,name},req,res}} = context
        // 获取到参数
        const full_name = `${owner}/${name}`

        // 执行具体组件的getInitialProps
        let pageData = {}
        if (Comp.getInitialProps){
            pageData = Comp.getInitialProps(context)
        }

        // 从缓存中取
        if (get(full_name)){
            return {
                repoBasic:get(full_name),
                ...pageData
            }
        }

        // 发送网络请求
        const repoRes = await api.request({
            url:`/repos/${owner}/${name}`
        },req,res)

        return {
            repoBasic:repoRes.data,
            ...pageData
        }
    }

    return withRouter(WithDetail)
}  