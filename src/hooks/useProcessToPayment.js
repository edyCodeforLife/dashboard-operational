import { useState } from 'react'
import { batch } from 'react-redux'
import { useDispatch } from 'react-redux'
import ConfirmDialog from '../components/ConfirmDialog'
import { pageIsBackdropOpen, pageShowSnackbar } from '../redux/actions/page'
import appointmentProcessToPayment from '../services/appointment/processToPayment'
import { useAuthentication } from './useAuthentication'

const useProcessToPayment = ({ defaultAppointmentId }) => {
  const { token } = useAuthentication()
  const dispatch = useDispatch()
  const [appointmentId, setAppointmentId] = useState(defaultAppointmentId || '')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirmProcessToPayment = () => {
    if (!appointmentId) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: 'Please fill Appointment ID field!',
          vertical: 'top',
          horizontal: 'right',
        }),
      )

      return
    }

    setIsConfirmDialogOpen(true)
  }

  const processToPayment = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await appointmentProcessToPayment({
        appointmentId,
        token,
      })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Process to Payment, Success!`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })

      setAppointmentId('')
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
        description={`Are you sure want to Process to Payment this Order ID "${appointmentId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processToPayment}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    )
  }

  return {
    appointmentId,
    setAppointmentId,
    handleConfirmProcessToPayment,
    modalDialog,
  }
}

export default useProcessToPayment
