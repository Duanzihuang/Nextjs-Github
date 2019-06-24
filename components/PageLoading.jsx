import {Spin} from 'antd'

export default () => {
    return <div className="root">
        <Spin tip="数据加载中..."/>
        <style jsx>{`
            .root{
                position:fixed;
                left:0;
                top:0;
                right:0;
                bottom:0;
                display:flex;
                align-items:center;
                justify-content:center;
                background:rgba(255,255,255,0.3);
                z-index:100;
            }
        `}</style>
    </div>
}