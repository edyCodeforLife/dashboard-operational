import React, { useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import { Card, TextField } from '@material-ui/core'
import {
  pageIsBackdropOpen,
  pageSetTitle,
  pageShowSnackbar,
} from '../../redux/actions/page'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import ConfirmDialog from '../../components/ConfirmDialog'
import InputCurrency from '../../components/InputCurrency'
import confirmPayment from '../../services/appointment/confirmPayment'
import Alert from '@material-ui/lab/Alert'

const ConfirmPayment = () => {
  const { loggedIn, token } = useAuthentication()
  const dispatch = useDispatch()
  const [appointmentRefId, setAppointmentRefId] = useState('')
  const [paidAmount, setPaidAmount] = useState(0)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  useEffect(() => {
    dispatch(pageSetTitle('Confirm Manual Transfer'))
  }, [])

  const handleConfirmPayment = () => {
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

  const processConfirmPayment = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await confirmPayment({ appointmentRefId, paidAmount, token })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Confirm Payment for Order ID: ${appointmentRefId}, success`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })

      setAppointmentRefId('')
      setPaidAmount(0)
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

  if (!loggedIn) {
    return null
  }

  return (
    <Card>
      <Alert severity="info">
        This feature used for Confirm Manual Transfer user via Bank Account and
        set Appointment Status to {'"PAID"'}. This feature only works for
        Appointment with payment method Manual Bank Transfer.
      </Alert>
      <Box display="flex" p={4}>
        <Box mt={1} ml={2}>
          <TextField
            name="order_id"
            label="Order ID"
            value={appointmentRefId}
            onChange={(e) => setAppointmentRefId(e.target.value)}
          />
        </Box>
        <Box mt={1} ml={2}>
          <TextField
            name="amount"
            label="Paid Amount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            InputProps={{
              inputComponent: InputCurrency,
            }}
          />
        </Box>
        <Box mt={1.5} ml={2}>
          <Button
            onClick={handleConfirmPayment}
            variant="contained"
            color="primary"
          >
            Confirm Payment
          </Button>
        </Box>
      </Box>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Warning!!!!!"
        description={`Are you sure want to Confirm Payment this Order ID "${appointmentRefId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processConfirmPayment}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    </Card>
  )
}

export default ConfirmPayment
