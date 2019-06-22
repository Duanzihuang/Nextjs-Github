import { Layout , Icon, Input, Avatar,Tooltip,Dropdown ,Menu} from 'antd'
import {connect} from 'react-redux'
import {useState,useCallback} from 'react'

const { Header, Content, Footer } = Layout

import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

// 导入其它组件
import Container from './Container'

import {withRouter} from 'next/router'

const githubStyle = {
  color: 'white',
  display: 'block',
  fontSize: 40,
  marginRight: 20,
  paddingTop: 10
}

import {logoutActionCreator} from '../store/actions/actionCreator'

// const Comp1 = ({color,children,style}) => <div style={{color,...style}}>{children}</div>

const MyLayout = ({children,user,logout,router}) => {

  // 给无状态组件设置state
  const [search,setSearch] = useState('')

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value)
  },[setSearch])

  const handleOnSearch = () => {}

  // 退出
  const userLogout = useCallback(()=>{
    logout()
  },[userLogout])

  const userDropdown = (
    <Menu>
      <Menu.Item onClick={userLogout}>退出登录</Menu.Item>
    </Menu>
  )

  return (
    <Layout className="layout">
      <Header>
        <Container renderder={<div className="header-inner" />}>
        <div className="header-inner">
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubStyle} />
            </div>
            <div><Input.Search value={search} onChange={handleSearchChange} onSearch={handleOnSearch} placeholder="搜索仓库" /></div>
          </div>
          <div className="header-right">
            <a href={publicRuntimeConfig.OAUTH_URL}>
              
            </a>
            {user && user.id ? (
              <Dropdown overlay={userDropdown}>
                <a href="/">
                  <Avatar size={40} src={user.avatar_url} />
                </a>
              </Dropdown>
            ) : (
               <Tooltip title="点击进行登录">
                  {/* <a href={publicRuntimeConfig.OAUTH_URL}> */}
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
            )}
          </div>
        </div>
        </Container>
      </Header>
      <Content>
        {/* <Container comp="p"> */}
        {/* <Container comp={Comp1}> */}
        
        {/* <Container>
          <Comp1 color='red'>{children}</Comp1>
        </Container> */}
        {/* 注意和下面的用法 */}
        {/* <Container renderer={<Comp1 color='purple' style={{fontSize:100}}/>}>
          {children}
        </Container> */}

        {/* <Container renderer={<div />}> */}
        <Container>
          {children}
        </Container>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        NextJs Github ©2019 Create By Duanzihuang
      </Footer>

      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>

      <style jsx global>{`
        #__next{
          height:100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header{
          padding-left:0;
          padding-right:0;
        }  
      `}</style>
    </Layout>
  )
}

export default connect(state =>{
  return {
    user:state.user
  }
},dispatch => {
  return {
    logout:() => dispatch(logoutActionCreator())
  }
})(withRouter(MyLayout))
