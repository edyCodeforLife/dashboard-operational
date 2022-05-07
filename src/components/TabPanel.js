import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <Box hidden={value !== index} {...other} width="100%">
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

export default TabPanel
