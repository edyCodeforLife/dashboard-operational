import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import useShallowEqualSelector from '../hooks/useShallowEqualSelector'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: '#fff',
  },
}))

const FullLoader = () => {
  const classes = useStyles()
  const { isBackdropOpen } = useShallowEqualSelector((state) => state.page)

  return (
    <Backdrop className={classes.backdrop} open={isBackdropOpen}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="inherit" />
        <Box mt={2}>Please wait...</Box>
      </Box>
    </Backdrop>
  )
}

export default FullLoader
