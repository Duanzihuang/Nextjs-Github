import {withRouter} from 'next/router'

import api from '../lib/api'
import Repo from './Repo'
import Link from 'next/link'

import {get} from '../lib/repo-basic-cache'

function makeQuery(queryObject) {
    const query = Object.entries(queryObject)
      .reduce((result, entry) => {
        result.push(entry.join('='))
        return result
      }, [])
      .join('&')
    return `?${query}`
}

export default function(Comp,type='index'){
    function WithDetail({repoBasic,router,...rest}){
        console.log('router.query is ',router.query)
        const query = makeQuery(router.query)
        console.log('query is',query)

        // console.log(repoBasic)
        return <div className="root">
            <div className="repo-basic">
                <Repo repo={repoBasic}/>
                <div className="tabs">
                    {type==='index' ? (
                        <span className="tab">Readme</span>
                    ) : (
                        <Link href={`/detail/${query}`}>
                            <a className="tab index">Readme</a>
                        </Link>
                    )}
                    {type==='issues' ? (
                        <span className="tab">Issues</span>
                    ) : (
                        <Link href={`/detail/issues/${query}`}>
                            <a className="tab issues">Issues</a>
                        </Link>
                    )}
                </div>
            </div>
            <div>
                <Comp {...rest}/>
            </div>
            <style jsx>{`
                .root {
                    padding-top: 20px;
                }
                .repo-basic {
                    padding: 20px;
                    border: 1px solid #eee;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
                .tab + .tab {
                    margin-left: 20px;
                }
            `}</style>
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
            pageData = await Comp.getInitialProps(context)
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