const userInitial = {
    username:'duanzihuang'
}

export default (state = userInitial,action) => {
    switch (action.type) {
        case "CHANGE":
            return {username:action.name}
            break;
    
        default:
            return state
            break;
    }
}