import { persistReducer } from 'redux-persist'
import user from './user'
import page from './page'

const storage = require('redux-persist/lib/storage').default
const getPersistConfig = (key, whitelist) => {
  const config = {
    key,
    storage,
  }
  if (whitelist?.length > 0) {
    config.whitelist = whitelist
  }
  return config
}

const userPersistConfig = () =>
  getPersistConfig('alteacare:user', ['token', 'loggedIn', 'role', 'hospitals'])

const rootReducer = {
  user: persistReducer(userPersistConfig(), user),
  page,
}

export default rootReducer
