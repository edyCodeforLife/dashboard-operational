import React, { useEffect } from 'react'
import { Card, TextField } from '@material-ui/core'
import { pageSetTitle } from '../../redux/actions/page'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import useMeetSpecialist from '../../hooks/useMeetSpecialist'
import { useDispatch } from 'react-redux'

const MeetSpecialist = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()
  const {
    appointmentRefId,
    setAppointmentRefId,
    handleConfirmSetMeetSpecialist,
    modalDialog,
  } = useMeetSpecialist()

  useEffect(() => {
    dispatch(pageSetTitle('Set Meet Specialist'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <Alert severity="info">
        This feature used for set Status Appointment to {'"MEET_SPECIALIST" '}
        (Temui Dokter) without waiting Appointment Schedule started. This
        feature only works for Appointment with {'"PAID"'} Status
      </Alert>
      <Box display="flex" p={4}>
        <TextField
          label="Order ID"
          value={appointmentRefId}
          onChange={(e) => setAppointmentRefId(e.target.value)}
        />
        <Box mt={1.5} ml={3}>
          <Button
            onClick={handleConfirmSetMeetSpecialist}
            variant="contained"
            color="primary"
          >
            Set Meet Specialist
          </Button>
        </Box>
      </Box>
      {modalDialog()}
    </Card>
  )
}

export default MeetSpecialist
