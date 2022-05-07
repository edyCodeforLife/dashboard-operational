import React, { useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import { Card, TextField } from '@material-ui/core'
import {
  pageIsBackdropOpen,
  pageSetTitle,
  pageShowSnackbar,
} from '../../redux/actions/page'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import appointmentSearch from '../../services/appointment/search'
import Alert from '@material-ui/lab/Alert'

const Search = () => {
  const { loggedIn, token } = useAuthentication()
  const dispatch = useDispatch()
  const [appointmentRefId, setAppointmentRefId] = useState('')

  useEffect(() => {
    dispatch(pageSetTitle('Search Appointment'))
  }, [])

  const searchAppointment = async () => {
    dispatch(pageIsBackdropOpen(true))

    try {
      const { appointmentId } = await appointmentSearch({
        orderId: appointmentRefId,
        token,
      })
      dispatch(pageIsBackdropOpen(false))
      setAppointmentRefId('')

      window.open(`/appointment/${appointmentId}`, '_blank')
    } catch (error) {
      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'error',
            message: error.message,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })
    }
  }

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <Alert severity="info">
        This feature used for Search Appointment by Order ID or Transaction ID
      </Alert>
      <Box display="flex" p={4}>
        <TextField
          label="Order ID"
          value={appointmentRefId}
          onChange={(e) => setAppointmentRefId(e.target.value)}
        />
        <Box mt={1.5} ml={3}>
          <Button
            onClick={searchAppointment}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default Search
