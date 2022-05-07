import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UserList from '../../components/UserList'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const User = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('User List'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <UserList />
}

export default User
