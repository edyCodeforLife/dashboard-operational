import { Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppointmentList from '../../components/AppointmentList'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const Ongoing = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Appointment Ongoing'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <AppointmentList type="ON_GOING" />
    </Card>
  )
}

export default Ongoing
