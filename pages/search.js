import {withRouter} from 'next/router'

function Search({router}){
    return <div>search---{router.query.query}</div>
}

export default withRouter(Search)