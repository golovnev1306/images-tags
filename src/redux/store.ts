import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './app-reducer'
import imagesReducer from './images-reducer'

export const rootReducer = combineReducers({
  app: appReducer,
  images: imagesReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
