import anecdoteService from '../services/anecdotes'
import { createNotification } from './notificationReducer'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANEC':
      return action.data
    default:
      return state
  }
}

export const likeAnecdote = (id) => {
  return async dispatch => {
    const needAnec = await anecdoteService.needAnec({id})
    const updatedAnec = await anecdoteService.likeVotes(needAnec)
    dispatch({
      type: 'LIKE',
      data: updatedAnec
    })
  }
}

export const createAnecdote = (anec) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(anec)
    dispatch({
      type: 'CREATE',
      data: newAnec
    })
    dispatch(createNotification(`a new anecdote '${newAnec.content}' has been created`, 5000))
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}

export default anecdoteReducer