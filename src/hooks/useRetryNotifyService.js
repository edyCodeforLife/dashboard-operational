import { useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import ConfirmDialog from '../components/ConfirmDialog'
import { pageIsBackdropOpen, pageShowSnackbar } from '../redux/actions/page'
import retryNotifyService from '../services/billing/retryNotifyService'
import { useAuthentication } from './useAuthentication'

const useRetryNotifyService = ({ defaultBillingId }) => {
  const { token } = useAuthentication()
  const dispatch = useDispatch()
  const [billingId, setBillingId] = useState(defaultBillingId || '')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirmRetryNotifyService = () => {
    if (!billingId) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: 'Please fill Billing ID field!',
          vertical: 'top',
          horizontal: 'right',
        }),
      )

      return
    }

    setIsConfirmDialogOpen(true)
  }

  const processRetryNotifyService = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await retryNotifyService({ billingId, token })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Retry notify service, success`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })

      setBillingId('')
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
        description={`Are you sure want to Retry Notify Service for this Billing ID "${billingId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processRetryNotifyService}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    )
  }

  return {
    modalDialog,
    handleConfirmRetryNotifyService,
    billingId,
    setBillingId,
  }
}

export default useRetryNotifyService
