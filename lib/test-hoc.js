function TestHoc (Comp) {
    function TestHocComponent({Component,pageProps,...rest}){
        if (pageProps){
            pageProps.test = "mytest 123"
        }

        return <Comp Component={Component} pageProps={pageProps} {...rest}/>
    }

    TestHocComponent.getInitialProps = Comp.getInitialProps

    return TestHocComponent
}

export default TestHoc