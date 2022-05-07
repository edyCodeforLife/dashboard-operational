import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const ConfirmDialog = ({
  isOpen = false,
  description,
  agreeText = 'Yes',
  cancelText = 'No',
  handleAgree,
  handleClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {cancelText}
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  description: PropTypes.string.isRequired,
  agreeText: PropTypes.string,
  cancelText: PropTypes.string,
  handleAgree: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ConfirmDialog
