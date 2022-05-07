import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { pageIsSnackbarOpen, pageSnackbarOption } from '../redux/actions/page'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alertFilledError: {
    backgroundColor: '#F9DC9F',
    color: '#4D3531',
    a: {
      color: '#4D3531',
    },
  },
}))

export const CustomizedSnackbar = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const defaultAutoHideDuration = 8000
  const {
    open,
    handleClose,
    severity,
    message,
    vertical,
    horizontal,
    autoHideDuration,
  } = props

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration || defaultAutoHideDuration}
        onClose={
          handleClose
            ? handleClose
            : () => {
                dispatch(pageIsSnackbarOpen(false))
                dispatch(pageSnackbarOption(null))
              }
        }
        anchorOrigin={{
          vertical: vertical || 'top',
          horizontal: horizontal || 'right',
        }}
        onEntered={() => {
          setTimeout(() => {
            dispatch(pageIsSnackbarOpen(false))
            dispatch(pageSnackbarOption(null))
          }, defaultAutoHideDuration)
        }}
        key={`${vertical || 'top'},${horizontal || 'right'}`}
        onExited={() => {
          dispatch(pageIsSnackbarOpen(false))
          dispatch(pageSnackbarOption(null))
        }}
      >
        <Alert
          onClose={
            handleClose
              ? handleClose
              : () => {
                  dispatch(pageIsSnackbarOpen(false))
                  dispatch(pageSnackbarOption(null))
                }
          }
          severity={severity}
          classes={{
            root: classes.alertRoot,
            filledError: classes.alertFilledError,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

CustomizedSnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  severity: PropTypes.string,
  message: PropTypes.string,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  autoHideDuration: PropTypes.number,
}

export default CustomizedSnackbar
