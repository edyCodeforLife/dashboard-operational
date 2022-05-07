const initialState = {
  title: 'Dashboard',
  isSnackbarOpen: false,
  snackbarOption: null,
  isDrawerOpen: false,
  isBackdropOpen: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PAGE_SET_TITLE': {
      return { ...state, title: action.payload }
    }
    case 'PAGE_IS_SNACKBAR_OPEN': {
      return {
        ...state,
        isSnackbarOpen: action.payload,
      }
    }
    case 'PAGE_SNACKBAR_OPTION': {
      return {
        ...state,
        snackbarOption: action.payload,
      }
    }
    case 'PAGE_SHOW_SNACKBAR': {
      return {
        ...state,
        isSnackbarOpen: action.payload.isSnackbarOpen,
        snackbarOption: action.payload.snackbarOption,
      }
    }
    case 'PAGE_IS_DRAWER_OPEN': {
      return {
        ...state,
        isDrawerOpen: action.payload,
      }
    }
    case 'PAGE_IS_BACKDROP_OPEN': {
      return {
        ...state,
        isBackdropOpen: action.payload,
      }
    }
    default:
      return state
  }
}

export default reducer
