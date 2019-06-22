import React from 'react'
import {Button} from 'antd'

import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

export default class Auth extends React.Component{
    login = () => {
        window.location.href = publicRuntimeConfig.OAUTH_URL
    }

    render(){
        return <div>
            <Button onClick={this.login}>授权登录</Button>
        </div>
    }
}