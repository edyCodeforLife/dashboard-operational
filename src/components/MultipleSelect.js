import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  inputRoot: {
    fontSize: 12,
  },
  labelRoot: {
    fontSize: 12,
    '&$labelFocused': {},
  },
})

const MultpleSelect = (props) => {
  const classes = useStyle()
  const { options, label, inputHandler, selectHandler, value, disabled } = props

  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={2}
      id={`multiple-${label}`}
      fullWidth
      disabled={disabled}
      options={options}
      value={value}
      onChange={(_, selected) => selectHandler(selected)}
      getOptionSelected={(option, selected) => option.label === selected.label}
      getOptionLabel={(option) => option.label}
      onInputChange={inputHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          InputLabelProps={{
            classes: {
              root: classes.labelRoot,
              focused: classes.labelFocused,
            },
          }}
        />
      )}
    />
  )
}

MultpleSelect.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  inputHandler: PropTypes.func,
  selectHandler: PropTypes.func,
  value: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
}

MultpleSelect.defaultProps = {
  label: '',
  disabled: false,
  options: [],
  value: [],
  inputHandler: () => {},
  selectHandler: () => {},
}

export default MultpleSelect
