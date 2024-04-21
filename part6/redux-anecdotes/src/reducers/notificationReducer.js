const initialState = ''
let timer;
const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATED':
            return action.data
        default:
            return state
    }
}

export const createNotification = (notification, time = 0) => {
    return async dispatch => {    
        clearTimeout(timer)
        dispatch({
            type: 'CREATED',
            data: notification
        })
        timer = setTimeout(() => {
            dispatch({
                type: 'CREATED',
                data: ''
            })
        }, time)
    }
}

export default notificationReducer