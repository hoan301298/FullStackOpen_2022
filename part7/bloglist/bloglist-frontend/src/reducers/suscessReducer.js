/* eslint-disable no-undef */
const initialState = null
let timer = null
const suscessReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'CREATED':
    return action.data
  default:
    return state
  }
}

export const suscessNotification = (notification, time = 0) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'CREATED',
      data: notification
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'CREATED',
        data: null
      })
    }, time)
  }
}

export default suscessReducer