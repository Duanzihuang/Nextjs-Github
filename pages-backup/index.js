import Router from 'next/router'

// Router钩子
const events = [
    'routeChangeStart',
    'routeChangeComplete',
    'routeChangeError',
    'beforeHistoryChange',
    'hashChangeStart',
    'hashChangeComplete'
]

function makeEvent(type){
    return (...args) => {
        console.log(type,...args)
    }
}

events.forEach(event => {
    Router.events.on(event,makeEvent(event))
})

export default class Index extends React.Component{
    render(){
        return <div>Index 首页</div>
    }
} 