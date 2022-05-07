import { useState } from 'react'
import { batch } from 'react-redux'
import { useDispatch } from 'react-redux'
import ConfirmDialog from '../components/ConfirmDialog'
import { pageIsBackdropOpen, pageShowSnackbar } from '../redux/actions/page'
import updateRoom from '../services/appointment/updateRoom'
import { useAuthentication } from './useAuthentication'

const useUpdateRoom = ({ defaultAppointmentId, defaultVideoCallProvider }) => {
  const { token } = useAuthentication()
  const dispatch = useDispatch()
  const [appointmentId, setAppointmentId] = useState(defaultAppointmentId || '')
  const [videoCallProvider, setVideoCallProvider] = useState(
    defaultVideoCallProvider || '',
  )
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirmUpdateRoom = () => {
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

  const processUpdateRoom = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await updateRoom({
        appointmentId,
        videoCallProvider,
        token,
      })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Update Room Success`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })

      setAppointmentId('')
      setVideoCallProvider('')
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
        description={`Are you sure want to Update Room this Order ID "${appointmentId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processUpdateRoom}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    )
  }

  return {
    appointmentId,
    videoCallProvider,
    setAppointmentId,
    setVideoCallProvider,
    handleConfirmUpdateRoom,
    modalDialog,
  }
}

export default useUpdateRoom
