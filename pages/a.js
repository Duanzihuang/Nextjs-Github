import { withRouter } from 'next/router'

class A extends React.Component{
    render(){
        return <div>i am a ---${this.props.router.query.id}</div>
    }
}

export default withRouter(A)