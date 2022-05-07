import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useUpdateRoom } from './hooks/useUpdateRoom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const UpdateRoom = ({
  appointmentId,
  defaultVideoCallProvider,
  setTypeModal,
}) => {
  const classes = useStyles()
  const {
    videoCallProvider,
    videoCallProviders,
    setVideoCallProvider,
    processUpdateRoom,
  } = useUpdateRoom({
    appointmentId,
    defaultVideoCallProvider,
    setTypeModal,
  })

  return (
    <div className={classes.paper}>
      <div>Video Call Provider</div>
      <Box my={2}>
        <Select
          value={videoCallProvider}
          fullWidth
          onChange={(e) => setVideoCallProvider(e.target.value)}
          MenuProps={MenuProps}
        >
          {videoCallProviders.map((vVideoCallProvider) => (
            <MenuItem key={vVideoCallProvider} value={vVideoCallProvider}>
              {vVideoCallProvider}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <div>
        <Button
          onClick={() => processUpdateRoom()}
          variant="contained"
          color="primary"
          size="small"
        >
          Update Room
        </Button>
      </div>
    </div>
  )
}

UpdateRoom.propTypes = {
  appointmentId: PropTypes.number.isRequired,
  defaultVideoCallProvider: PropTypes.string.isRequired,
  setTypeModal: PropTypes.func.isRequired,
}

export default UpdateRoom
