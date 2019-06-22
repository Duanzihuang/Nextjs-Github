import {cloneElement} from 'react'

const style = {
    width:'100%',
    maxWidth:1200,
    marginLeft:'auto',
    marginRight:'auto',
    // paddingLeft:20,
    // paddingRight:20
}

// export default ({children,comp:Comp = 'div'}) => {
//     return <Comp style={style}>{children}</Comp>
// }

export default ({children,renderer = <div />}) => {
    // console.log(renderer)
    // 拷贝一个Element,并且使用style 和 children 覆盖renderer中的Element
    const newElement = cloneElement(renderer,{
        style:Object.assign({},renderer.props.style,style),
        children
    })

    // console.log(newElement)

    return newElement
}