import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

const Notfound = ({ message }) => {
  return (
    <Box
      padding={5}
      display="flex"
      alignSelf="stretch"
      flexDirection="column"
      alignItems="center"
      justifyContent="ceneter"
    >
      <CancelIcon fontSize="large" color="error" />
      <Box mt={2}>{message || 'Data Not found'}</Box>
    </Box>
  )
}

Notfound.propTypes = {
  message: PropTypes.string,
}

export default Notfound
