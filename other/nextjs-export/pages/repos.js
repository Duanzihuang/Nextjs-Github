import axios from 'axios'
import Link from 'next/link'

function Repos({list}){
    return <div>
        {list.map(item => <p key={item.id}>{item.owner.login  + '/' + item.name}</p>)}
        <div>
            <Link href="/repos"><a>1</a></Link>
            <Link href="/repos?page=2" as="/repos/2"><a>2</a></Link>
            <Link href="/repos?page=3" as="/repos/3"><a>3</a></Link>
            <style jsx>{`
                a {
                    display:inline-block;
                    padding:20px;
                }
            `}</style>
        </div>
    </div>
}

Repos.getInitialProps = async ({query:{page = 1}}) => {
    console.log('---repos---getInitialProps---')
    const resp = await axios.get(`https://api.github.com/search/repositories?q=react&page=${page}`)

    return {
        list:resp.data.items
    }
}

export default Repos