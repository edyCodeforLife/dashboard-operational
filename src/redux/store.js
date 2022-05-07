import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV === 'development') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const createReducer = (injectedReducers = {}) => {
  const newReducer = combineReducers({
    ...injectedReducers,
    ...rootReducer,
  })

  return newReducer
}

export const makeConfiguredStore = () => {
  const store = createStore(
    createReducer(),
    undefined,
    compose(bindMiddleware([])),
  )

  return store
}

export const makeStore = (context) => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return makeConfiguredStore(context)
  } else {
    const { persistStore } = require('redux-persist')

    const store = makeConfiguredStore()
    store.__persistor = persistStore(store)

    return store
  }
}

export const wrapper = createWrapper(makeStore)
