const Detail = () => {
    return <div>
        detail
    </div>
}

Detail.getInitialProps = ctx => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({})
        }, 2000);
    })
}

export default Detail