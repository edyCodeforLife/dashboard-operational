import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import VisibilityIcon from '@material-ui/icons/Visibility'
import moment from 'moment'
import { formatCurrency } from '../../helpers/currency'

const ReactJson = dynamic(import('react-json-view'), { ssr: false })

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '80vw',
    maxHeight: '80vh',
    overflow: 'auto',
  },
}))

const Overview = ({ data = null }) => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailData, setDetailData] = useState({})

  return (
    <div>
      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          mr={2}
          overflow="auto"
        >
          <Box display="flex">
            <Box flex={1}>Order ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.order_code}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Billing ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.billing_id || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Billing Version</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.billing_version || 'v1'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Hospital</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.doctor?.hospital?.name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Doctor</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.doctor?.name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>User</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.parent_user?.name
                ? `${data?.parent_user?.name} (${data?.parent_user?.ref_id})`
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>User Phone Number</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.parent_user?.phone_number || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>User Email</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.parent_user?.email || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Contact Phone Number</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.patient?.contact_phone || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Contact Email</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.patient?.contact_email || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Patient</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.patient?.name
                ? `${data?.patient?.name} (${data?.patient?.ref_id})`
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Schedule</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.schedule
                ? `${moment(data.schedule.date).format('DD/MM/YYYY')} (${
                    data.schedule.time_start
                  } - ${data.schedule.time_end})`
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Consultation Method</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.consultation_method}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Payment Method</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.transaction?.detail?.name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Video Call Provider</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.room?.video_call_provider || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Notes</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.notes || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Notes Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.notes_at
                ? moment(data.notes_at).format('DD/MM/YYYY HH:mm:ss')
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Notes By</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.notes_by
                ? `${data.notes_by.first_name} ${data.notes_by.last_name}`
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Canceled Notes</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.canceled_notes || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Canceled Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.canceled_at
                ? moment(data.canceled_at).format('DD/MM/YYYY HH:mm:ss')
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Canceled By</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.canceled_by
                ? `${data.canceled_by.first_name} ${data.canceled_by.last_name}`
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Sub Total</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {formatCurrency(data.total_original_price, 'Rp')}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Total Discount</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {formatCurrency(-data.total_discount, 'Rp')}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Total Voucher</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {formatCurrency(-data.total_voucher, 'Rp')}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Grand Total</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {formatCurrency(data.total_price, 'Rp')}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Status System</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.status}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Created Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {moment(data?.created).format('DD/MM/YYYY HH:mm:ss')}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Expired Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.expired_at
                ? moment(data?.expired_at).format('DD/MM/YYYY HH:mm:ss')
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>In Operational Hour</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.in_operational_hour === true ? 'TRUE' : 'FALSE'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Detail Data</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              <VisibilityIcon
                onClick={() => {
                  setDetailData(data?.data || {})
                  setIsModalOpen(true)
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" flex={1} overflow="auto">
          <Box display="flex">
            <Box flex={1}>External Patient ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.external_patient_id}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Appointment ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.external_appointment_id}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Case No</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.external_case_no}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Insurance Company</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.ins_name}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Insurance No</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.ins_no}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Appointment Error</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.external_appointment_error}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Case Error</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.external_case_error}
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={classes.paper}>
          <ReactJson src={detailData} />
        </div>
      </Modal>
    </div>
  )
}

Overview.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Overview
