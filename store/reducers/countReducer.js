const countInitial = {
    count:0
}

export default (state = countInitial,action) => {
    console.log("state is",state)
    switch (action.type) {
        case "ADD":
            return {count:state.count + action.num}
            break;
    
        default:
            return state
            break;
    }
}