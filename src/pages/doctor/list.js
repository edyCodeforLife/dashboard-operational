import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DoctorList from '../../components/DoctorList'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const User = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Doctor List'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <DoctorList />
}

export default User
