const filterReducer = (state = null, action) => {
    switch(action.type) {
        case 'FILTER':
            return action.data.word
        default:
            return state
    }
}

export const filterAnec = (word) => {
    return {
        type: 'FILTER',
        data : {
            word
        }
    }
}

export default filterReducer