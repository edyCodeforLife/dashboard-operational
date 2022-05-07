import { useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import ConfirmDialog from '../components/ConfirmDialog'
import { pageIsBackdropOpen, pageShowSnackbar } from '../redux/actions/page'
import manualCancelAppointmentExternal from '../services/appointment/manualCancelAppointmentExternal'
import { useAuthentication } from './useAuthentication'

const useCancelAppointmentExternal = (defaultAppointmentRefId) => {
  const { token } = useAuthentication()
  const dispatch = useDispatch()
  const [appointmentRefId, setAppointmentRefId] = useState(
    defaultAppointmentRefId || '',
  )
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirmCancelAppointment = () => {
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

  const processManualCancelAppointment = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await manualCancelAppointmentExternal({ appointmentRefId, token })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Cancel Appointment External for Order ID: ${appointmentRefId}, success`,
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
        description={`Are you sure want to Cancel Manual Appointment External this Order ID "${appointmentRefId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processManualCancelAppointment}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    )
  }

  return {
    modalDialog,
    handleConfirmCancelAppointment,
    appointmentRefId,
    setAppointmentRefId,
  }
}

export default useCancelAppointmentExternal
