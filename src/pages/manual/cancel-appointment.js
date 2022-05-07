import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, TextField } from '@material-ui/core'
import { pageSetTitle } from '../../redux/actions/page'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import useCancelAppointmentExternal from '../../hooks/useCancelAppointmentExternal'

const ManualCancelAppointment = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()
  const {
    modalDialog,
    handleConfirmCancelAppointment,
    appointmentRefId,
    setAppointmentRefId,
  } = useCancelAppointmentExternal()

  useEffect(() => {
    dispatch(pageSetTitle('Manual Cancel Appointment External'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <Alert severity="info">
        This feature used for Cancel Appointment External, if when cancel
        Appointment External has error and can retry manual via this Feature.
        This feature only works for Appointment with
        {
          ' "PAID", "MEET_SPECIALIST", "ON_GOING", "WAITING_FOR_MEDICAL_RESUME" '
        }
        Status
      </Alert>
      <Box display="flex" p={4}>
        <TextField
          label="Order ID"
          value={appointmentRefId}
          onChange={(e) => setAppointmentRefId(e.target.value)}
        />
        <Box mt={1.5} ml={3}>
          <Button
            onClick={handleConfirmCancelAppointment}
            variant="contained"
            color="primary"
          >
            Cancel Appointment External
          </Button>
        </Box>
      </Box>
      {modalDialog()}
    </Card>
  )
}

export default ManualCancelAppointment
