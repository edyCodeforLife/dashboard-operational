import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card } from '@material-ui/core'
import { pageSetTitle } from '../../redux/actions/page'
import SocketRoom from '../../components/SocketRoom'
import { useAuthentication } from '../../hooks/useAuthentication'

const Canceled = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Socket Room'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <SocketRoom />
    </Card>
  )
}

export default Canceled
