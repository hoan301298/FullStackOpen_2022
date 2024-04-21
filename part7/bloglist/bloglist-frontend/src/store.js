import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import suscessReducer from './reducers/suscessReducer'
import errorReducer from './reducers/errorReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  suscessMess: suscessReducer,
  errorMess: errorReducer,
  blogs: blogsReducer,
  user: userReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store