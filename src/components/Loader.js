import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

const Loader = () => {
  return (
    <Box
      padding={5}
      display="flex"
      alignSelf="stretch"
      flexDirection="column"
      alignItems="center"
      justifyContent="ceneter"
    >
      <CircularProgress />
      <Box mt={2}>Please wait...</Box>
    </Box>
  )
}

export default Loader
