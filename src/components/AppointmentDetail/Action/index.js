import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Medrec from '../Medrec'
import UpdateRoom from '../UpdateRoom'
import useCancelAppointmentExternal from '../../../hooks/useCancelAppointmentExternal'
import useCreateAppointmentExternal from '../../../hooks/useCreateAppointmentExternal'
import useCreateCaseExternal from '../../../hooks/useCreateCaseExternal'
import useMeetSpecialist from '../../../hooks/useMeetSpecialist'
import useResetPaymentMethod from '../../../hooks/useResetPaymentMethod'
import useProcessToPayment from '../../../hooks/useProcessToPayment'
import useRetryNotifyService from '../../../hooks/useRetryNotifyService'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    maxWidth: '80vw',
    maxHeight: '80vh',
    overflow: 'auto',
  },
}))

const Action = ({ data }) => {
  const classes = useStyles()
  const {
    modalDialog: modalDialogCreateAppointment,
    handleConfirmCreateAppointment,
  } = useCreateAppointmentExternal(data.order_code)
  const { modalDialog: modalDialogCreateCase, handleConfirmCreateCase } =
    useCreateCaseExternal(data.order_code)
  const {
    modalDialog: modalDialogCancelAppointment,
    handleConfirmCancelAppointment,
  } = useCancelAppointmentExternal(data.order_code)
  const {
    handleConfirmSetMeetSpecialist,
    modalDialog: modalDialogSetMeetSpecialist,
  } = useMeetSpecialist(data.order_code)
  const {
    handleConfirmResetPaymentMethod,
    modalDialog: modalResetPaymentMethod,
  } = useResetPaymentMethod({
    billingVersion: data.billing_version,
    defaultServiceId: data.billing_id || data.id,
  })
  const { handleConfirmProcessToPayment, modalDialog: modalProcessToPayment } =
    useProcessToPayment({
      defaultAppointmentId: data.id,
    })
  const {
    handleConfirmRetryNotifyService,
    modalDialog: modalRetryNotifyService,
  } = useRetryNotifyService({ defaultBillingId: data.billing_id })

  const [typeModal, setTypeModal] = useState(null)

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <Button
            onClick={() => handleConfirmCreateAppointment()}
            fullWidth
            variant="contained"
            color="primary"
          >
            Create Appointment External
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => handleConfirmCreateCase()}
            fullWidth
            variant="contained"
            color="primary"
          >
            Create Case External
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => handleConfirmCancelAppointment()}
            fullWidth
            variant="contained"
            color="primary"
          >
            Cancel Appointment External
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => handleConfirmSetMeetSpecialist()}
            fullWidth
            variant="contained"
            color="primary"
          >
            Set Meet Specialist
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => setTypeModal('CHECK_MEDICAL_RECORD')}
            fullWidth
            variant="contained"
            color="primary"
          >
            Check Medical Record
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => handleConfirmResetPaymentMethod()}
            fullWidth
            variant="contained"
            color="primary"
          >
            Reset Payment Method
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => setTypeModal('UPDATE_ROOM')}
            fullWidth
            variant="contained"
            color="primary"
          >
            Update Room
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => handleConfirmProcessToPayment()}
            fullWidth
            variant="contained"
            color="primary"
          >
            Process To Payment
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => handleConfirmRetryNotifyService()}
            fullWidth
            variant="contained"
            color="primary"
          >
            Retry Notify Service
          </Button>
        </Grid>
      </Grid>
      <Modal
        className={classes.modal}
        open={typeModal !== null}
        onClose={() => setTypeModal(null)}
      >
        <div className={classes.paper}>
          {typeModal === 'CHECK_MEDICAL_RECORD' && data && (
            <Medrec
              appointmentId={data?.id}
              patient={data?.patient}
              userId={data?.user_id}
            />
          )}
          {typeModal === 'UPDATE_ROOM' && data && (
            <UpdateRoom
              defaultVideoCallProvider={data?.room?.video_call_provider}
              appointmentId={data?.id}
              setTypeModal={setTypeModal}
            />
          )}
        </div>
      </Modal>
      {modalDialogCreateAppointment()}
      {modalDialogCreateCase()}
      {modalDialogCancelAppointment()}
      {modalDialogSetMeetSpecialist()}
      {modalResetPaymentMethod()}
      {modalProcessToPayment()}
      {modalRetryNotifyService()}
    </div>
  )
}

Action.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Action
