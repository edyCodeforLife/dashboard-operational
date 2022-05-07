export const userSetToken = (data) => ({
  type: 'USER_SET_TOKEN',
  payload: data,
})

export const userSetLoggedIn = (data) => ({
  type: 'USER_SET_LOGGEDIN',
  payload: data,
})

export const userSetProfile = (data) => ({
  type: 'USER_SET_PROFILE',
  payload: data,
})

export const userSetRole = (data) => ({
  type: 'USER_SET_ROLE',
  payload: data,
})

export const userSetHospitals = (data) => ({
  type: 'USER_SET_HOSPITALS',
  payload: data,
})
