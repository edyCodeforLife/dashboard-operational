import { useState } from 'react'
import { batch } from 'react-redux'
import { useDispatch } from 'react-redux'
import ConfirmDialog from '../components/ConfirmDialog'
import { pageIsBackdropOpen, pageShowSnackbar } from '../redux/actions/page'
import setMeetSpecialist from '../services/appointment/setMeetSpecialist'
import { useAuthentication } from './useAuthentication'

const useMeetSpecialist = (defaultAppointmentRefId) => {
  const { token } = useAuthentication()
  const dispatch = useDispatch()
  const [appointmentRefId, setAppointmentRefId] = useState(
    defaultAppointmentRefId || '',
  )
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirmSetMeetSpecialist = () => {
    if (!appointmentRefId) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: 'Please fill Order ID field!',
          vertical: 'top',
          horizontal: 'right',
        }),
      )

      return
    }

    setIsConfirmDialogOpen(true)
  }

  const processMeetSpecialist = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await setMeetSpecialist({ appointmentRefId, token })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Set Meet Specialist for Order ID: ${appointmentRefId}, success`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })

      setAppointmentRefId('')
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

  const modalDialog = () => {
    return (
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Warning!!!!!"
        description={`Are you sure want to Set Meet Specialist this Order ID "${appointmentRefId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processMeetSpecialist}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    )
  }

  return {
    appointmentRefId,
    setAppointmentRefId,
    handleConfirmSetMeetSpecialist,
    modalDialog,
  }
}

export default useMeetSpecialist
