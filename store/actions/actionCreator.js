export function add(num){
    return {
        type:'ADD',
        num
    }
}

export function asyncAdd(num){
    return dispatch => {
        setTimeout(() => {
            dispatch(add(num))
        }, 2000)
    }
}

export function changeName(name){
    return {
        type:'CHANGE',
        name
    }
}