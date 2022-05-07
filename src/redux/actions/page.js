export const pageSetTitle = (data) => ({
  type: 'PAGE_SET_TITLE',
  payload: data,
})

export const pageIsSnackbarOpen = (payload) => {
  return {
    type: 'PAGE_IS_SNACKBAR_OPEN',
    payload,
  }
}

export const pageSnackbarOption = (payload) => {
  return {
    type: 'PAGE_SNACKBAR_OPTION',
    payload,
  }
}

export const pageShowSnackbar = (snackbarOption) => {
  return {
    type: 'PAGE_SHOW_SNACKBAR',
    payload: {
      isSnackbarOpen: true,
      snackbarOption,
    },
  }
}

export const pageIsDrawerOpen = (payload) => {
  return {
    type: 'PAGE_IS_DRAWER_OPEN',
    payload,
  }
}

export const pageIsBackdropOpen = (payload) => {
  return {
    type: 'PAGE_IS_BACKDROP_OPEN',
    payload,
  }
}
