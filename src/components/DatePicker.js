import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
  },
}))

const DatePicker = ({ label = 'Date', value, onChangeDate }) => {
  const classes = useStyles()

  return (
    <TextField
      id="date"
      label={label}
      type="date"
      value={value || moment().format('YYYY-MM-DD')}
      onChange={(e) => {
        const date = e.target.value || moment().format('YYYY-MM-DD')
        if (onChangeDate) {
          onChangeDate(date)
        }
      }}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired,
}

export default DatePicker
