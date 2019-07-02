import withRepoBasic from '../../components/with-repo-basic'
import dynamic from 'next/dynamic'

import api from '../../lib/api'

const MDRender = dynamic(()=>import('../../components/MarkdownRender'))

const Detail = ({readme}) => {    
    return <div>
        <MDRender content={readme.content} isBase64={true}/>
    </div>
}

Detail.getInitialProps = async ({ctx:{query:{owner,name},req,res}}) => {
    console.log('----come here------------')
    // 发送网络请求
    const readMeResp = await api.request({
        url:`/repos/${owner}/${name}/readme`
    },req,res)

    return {
        readme:readMeResp.data
    }
}

export default withRepoBasic(Detail,'index')