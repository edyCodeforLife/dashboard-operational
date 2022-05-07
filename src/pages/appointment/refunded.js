import { Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppointmentList from '../../components/AppointmentList'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const Refunded = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Appointment Refunded'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <AppointmentList type="REFUNDED" status={['REFUNDED']} />
    </Card>
  )
}

export default Refunded
