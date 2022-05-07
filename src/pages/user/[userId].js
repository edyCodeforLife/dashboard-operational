import { Card } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UserDetail from '../../components/UserDetail'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const Detail = () => {
  const { loggedIn } = useAuthentication()
  const router = useRouter()
  const dispatch = useDispatch()
  const { userId } = router.query

  useEffect(() => {
    dispatch(pageSetTitle('User Detail'))
  }, [])

  if (!loggedIn || !userId) {
    return null
  }

  return (
    <Card>
      <UserDetail userId={userId} />
    </Card>
  )
}

export default Detail
