import { HYDRATE } from 'next-redux-wrapper'
import hydrate from '../../helpers/hydrate'

const initialState = {
  token: null,
  loggedIn: null,
  role: null,
  profile: null,
  hospitals: [],
  hydrated: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...hydrate(state, action, 'user') }
    }

    case 'USER_SET_TOKEN': {
      return { ...state, token: action.payload }
    }

    case 'USER_SET_LOGGEDIN': {
      return { ...state, loggedIn: action.payload }
    }

    case 'USER_SET_ROLE': {
      return { ...state, role: action.payload }
    }

    case 'USER_SET_PROFILE': {
      return { ...state, profile: action.payload }
    }

    case 'USER_SET_HOSPITALS': {
      return { ...state, hospitals: action.payload }
    }

    default:
      return state
  }
}

export default reducer
