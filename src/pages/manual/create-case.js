import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, TextField } from '@material-ui/core'
import { pageSetTitle } from '../../redux/actions/page'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import useCreateCaseExternal from '../../hooks/useCreateCaseExternal'

const ManualCreateCase = () => {
  const {
    appointmentRefId,
    setAppointmentRefId,
    handleConfirmCreateCase,
    modalDialog,
  } = useCreateCaseExternal()
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Manual Create Case External'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <Alert severity="info">
        This feature used for create Case External, if when create Case External
        has error and can retry manual via this Feature. This feature only works
        for Appointment with
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
            onClick={handleConfirmCreateCase}
            variant="contained"
            color="primary"
          >
            Create Case External
          </Button>
        </Box>
      </Box>
      {modalDialog()}
    </Card>
  )
}

export default ManualCreateCase
