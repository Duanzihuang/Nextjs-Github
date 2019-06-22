import axios from 'axios'

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

export function logoutActionCreator(){
    return dispatch => {
        axios.post('/logout').then(resp => {
            if (resp.status === 200){
                dispatch({
                    type:'LOGOUT'
                })
            } else {
                console.log('logout fail ',err)
            }
        }).catch(err=>{
            console.log('logout fail ',err)
        })
    }
}

export function changeName(name){
    return {
        type:'CHANGE',
        name
    }
}