import { useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import ConfirmDialog from '../components/ConfirmDialog'
import { pageIsBackdropOpen, pageShowSnackbar } from '../redux/actions/page'
import resetPaymentMethodV1 from '../services/appointment/resetPaymentMethod'
import resetPaymentMethodV2 from '../services/billing/resetPaymentMethod'
import { useAuthentication } from './useAuthentication'

const useResetPaymentMethod = ({ billingVersion, defaultServiceId }) => {
  const { token } = useAuthentication()
  const dispatch = useDispatch()
  const [serviceId, setServiceId] = useState(defaultServiceId || '')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirmResetPaymentMethod = () => {
    if (!serviceId) {
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

  const processResetPaymentMethod = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      if (billingVersion === 'v1') {
        await resetPaymentMethodV1({ appointmentId: serviceId, token })
      }

      if (billingVersion === 'v2') {
        await resetPaymentMethodV2({ billingId: serviceId, token })
      }

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Reset payment method, success`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })

      setServiceId('')
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
        description={`Are you sure want to Reset Payment Method for this ${
          billingVersion === 'v2'
            ? `Billing ID "${serviceId}"`
            : `Appointment ID "${serviceId}"`
        }?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processResetPaymentMethod}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    )
  }

  return {
    modalDialog,
    handleConfirmResetPaymentMethod,
    serviceId,
    setServiceId,
  }
}

export default useResetPaymentMethod
