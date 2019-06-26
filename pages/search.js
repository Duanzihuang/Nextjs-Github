import {memo,isValidElement} from 'react'
import {withRouter} from 'next/router'
import api from '../lib/api'
import {Row,Col,List,Pagination} from 'antd'
import Repo from '../components/Repo'

import Link from 'next/link'

// 每页20条数据
const per_page = 20

// 查询列表
const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust']
const SORT_TYPES = [
    {
        name: 'Best Match'
    },
    {
        name: 'Most Stars',
        value: 'stars',
        order: 'desc'
    },
    {
        name: 'Fewest Stars',
        value: 'stars',
        order: 'asc'
    },
    {
        name: 'Most Forks',
        value: 'forks',
        order: 'desc'
    },
    {
        name: 'Fewest Forks',
        value: 'forks',
        order: 'asc'
    }
]

const FilterLink = memo(({name,query,lang,sort,order,page}) => {
    let queryString = `?query=${query}`

    if (lang) queryString += `&lang=${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString += `&page=${page}`

    queryString += `&per_page=${per_page}`

    return <Link href={`/search${queryString}`}>
        {isValidElement(name) ? name : <a>{name}</a>}
    </Link>
})

const selectedItemStyle = {
    borderLeft:'2px solid #e36209',
    fontWeight:100
}

function noop() {}

function Search({router,repos}){
    // console.log(router.query)
    const {...query} = router.query
    const {lang,sort,order,page} = router.query

    return <div className="root">
        <Row gutter={20}>
            <Col span={6}>
                <List
                    header={<span className="list-header">语言</span>}
                    bordered
                    dataSource={LANGUAGES}
                    style={{marginBottom:20}}
                    renderItem={item => {
                        const selected = lang === item
                        return <List.Item style={selected ? selectedItemStyle : null}>
                            {
                                selected ? <span>{item}</span> : 
                                <FilterLink {...query} name={item} lang={item}/>
                            }
                        </List.Item>
                    }}
                />
                <List
                    header={<span className="list-header">排序</span>}
                    bordered
                    dataSource={SORT_TYPES}
                    renderItem={item => {
                        let selected = false
                        if (item.name === 'Best Match' && !sort) {
                            selected = true
                        } else if (item.value === sort && item.order === order) {
                            selected = true
                        }
                        return (
                        <List.Item style={selected ? selectedItemStyle : null}>
                            {
                                selected ? <span>{item.name}</span> :
                                <FilterLink {...query} sort={item.value} order={item.order} name={item.name}/>
                            }
                        </List.Item>
                    )}}
                />
            </Col>
            <Col span={18}>
                <h3 className="repos-title">{repos.total_count} 个仓库</h3>
                {
                    repos.items.map(item => {
                        return <Repo key={item.id} repo={item} />
                    })
                }
                <div className="pagination">
                    <Pagination  
                        pageSize={per_page}
                        current={Number(page) || 1}
                        total={1000}
                        onChange={noop}
                        itemRender={(page,type,ol) => {
                            const p = type === 'page' ? page : type === 'prev' ? page - 1 : page + 1
                            const name = type === 'page' ? page : ol
                            return <FilterLink {...query} page={p} name={name}/>
                        }}
                    />
                </div>
            </Col>
        </Row>
        <style jsx>{`
            .root{
                padding:20px 0px;
            }
            .list-header{
                font-weight:800;
                font-size:16px;
            }
            .repos-title{
                border-bottom: 1px solid #eee;
                font-size:24px;
                line-height:50px;
            }
            .pagination{
                padding:20px;
                text-align:center;
            }
        `}</style>
    </div>
}

Search.getInitialProps = async ({ctx}) => {
    console.log(`search getInitialProps`)

    const {query,lang,sort,order,page} = ctx.query

    if (!query){
        return {
            repos:{
                total_count:0
            }
        }
    }

    // ?q=react+language:javascript&sort=stars&order=desc&page=2

    let queryString = `?q=${query}`
    if (lang) queryString += `+language:${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString += `&page=${page}`

    queryString += `&per_page=${per_page}`

    // console.log(queryString)

    // 获取传递过来的参数
    const result = await api.request({
        url:`/search/repositories${queryString}`
    },ctx.req,ctx.res)

    return {
        repos:result.data
    }
}

export default withRouter(Search)