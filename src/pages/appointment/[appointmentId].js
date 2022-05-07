import { Card } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppointmentDetail from '../../components/AppointmentDetail'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const Detail = () => {
  const { loggedIn } = useAuthentication()
  const router = useRouter()
  const dispatch = useDispatch()
  const { appointmentId } = router.query

  useEffect(() => {
    dispatch(pageSetTitle('Appointment Detail'))
  }, [])

  if (!loggedIn || !appointmentId) {
    return null
  }

  return (
    <Card>
      <AppointmentDetail appointmentId={appointmentId} />
    </Card>
  )
}

export default Detail
