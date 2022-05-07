import { useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import { pageIsBackdropOpen, pageShowSnackbar } from '../redux/actions/page'
import { useAuthentication } from '../hooks/useAuthentication'
import ConfirmDialog from '../components/ConfirmDialog'
import manualCreateCaseExternal from '../services/appointment/manualCreateCaseExternal'

const useCreateCaseExternal = (defaultAppointmentRefId) => {
  const { token } = useAuthentication()
  const dispatch = useDispatch()
  const [appointmentRefId, setAppointmentRefId] = useState(
    defaultAppointmentRefId || '',
  )
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirmCreateCase = () => {
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

  const processManualCreateCase = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await manualCreateCaseExternal({ appointmentRefId, token })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Create Case External for Order ID: ${appointmentRefId}, success`,
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
        description={`Are you sure want to Create Manual Case External this Order ID "${appointmentRefId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processManualCreateCase}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    )
  }

  return {
    modalDialog,
    handleConfirmCreateCase,
    appointmentRefId,
    setAppointmentRefId,
  }
}

export default useCreateCaseExternal
