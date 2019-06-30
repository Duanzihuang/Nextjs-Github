import withRepoBasic from '../../components/with-repo-basic'

import api from '../../lib/api'

const Detail = ({readme}) => {
    console.log(readme)
    return <div>i am detail</div>
}

Detail.getInitialProps = async ({ctx:{query:{owner,name},req,res}}) => {
    // 发送网络请求
    const readMeResp = await api.request({
        url:`/repos/${owner}/${name}/readme`
    },req,res)

    return {
        readme:readMeResp.data
    }
}

export default withRepoBasic(Detail,'index')