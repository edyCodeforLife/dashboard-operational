import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core'
import ConfirmDialog from '../ConfirmDialog'
import { batch, useDispatch } from 'react-redux'
import { pageIsBackdropOpen, pageShowSnackbar } from '../../redux/actions/page'
import cmsDoctorSyncSchedule from '../../services/cms/doctorSyncSchedule'
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector'

const Overview = ({ data = null }) => {
  const { token } = useShallowEqualSelector((state) => state.user)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const dispatch = useDispatch()

  const processSyncSchedule = async () => {
    setIsConfirmDialogOpen(false)
    dispatch(pageIsBackdropOpen(true))

    try {
      await cmsDoctorSyncSchedule({ doctorId: data.doctor_id, token })

      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Sync Schedule Doctor "${data.name}", success`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })
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

  return (
    <div>
      <Box mb={2} mt={-2}>
        <Button
          onClick={() => setIsConfirmDialogOpen(true)}
          variant="contained"
          color="primary"
          size="small"
        >
          Sync Schedule
        </Button>
      </Box>
      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          mr={2}
          overflow="auto"
        >
          <Box display="flex" mt={1}>
            <Box flex={1}>Name</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Overview</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {`${data.overview || '-'}`}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>About</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {`${data.about || '-'}`}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Is Popular?</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {`${data.is_popular}`}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>SIP</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.sip || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Experience</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.experience || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Price</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.price?.formatted || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Specialization</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.specialization?.name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Hospital</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.hospital
                ?.map((hospital) => {
                  const availableDay = hospital.available_day?.join(', ')
                  return `${hospital.name} (${availableDay})`
                })
                .join(', ')}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Available Day</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.available_day_all_hospital?.join(', ')}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          overflow="auto"
        ></Box>
      </Box>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Warning!!!!!"
        description={`Are you sure want to Sync Schedule Doctor "${data.name}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={processSyncSchedule}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
    </div>
  )
}

Overview.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Overview
