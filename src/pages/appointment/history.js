import { Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppointmentList from '../../components/AppointmentList'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const History = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Appointment Completed'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <AppointmentList type="COMPLETED" status={['COMPLETED']} />
    </Card>
  )
}

export default History
