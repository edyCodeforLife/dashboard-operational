import { Box, Tooltip } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const Status = ({ textColor, bgColor, status, statusSystem }) => {
  return (
    <Tooltip title={`Status System: ${statusSystem}`} arrow>
      <Box
        color={textColor}
        bgcolor={bgColor}
        paddingX={1}
        paddingY={0.5}
        textAlign="center"
        fontSize={12}
        borderRadius={5}
      >
        {status}
      </Box>
    </Tooltip>
  )
}

Status.propTypes = {
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusSystem: PropTypes.string.isRequired,
}

export default Status
