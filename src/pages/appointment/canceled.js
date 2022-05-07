import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card } from '@material-ui/core'
import { pageSetTitle } from '../../redux/actions/page'
import AppointmentList from '../../components/AppointmentList'
import { useAuthentication } from '../../hooks/useAuthentication'

const Canceled = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Appointment Canceled'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <AppointmentList type="CANCELED" />
    </Card>
  )
}

export default Canceled
