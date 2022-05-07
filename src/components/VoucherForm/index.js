import React from 'react'
import Link from '@material-ui/core/Link'
import MomentUtils from '@date-io/moment'
import { makeStyles } from '@material-ui/styles'
import useVoucherForm from './hooks/useVoucherForm'
import useDoctorService from './hooks/useDoctorService'
import useHospitalService from './hooks/useHospitalService'
import usePatientService from './hooks/usePatientService'
import useSpecializationService from './hooks/useSpecializationService'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'

import MultipleSelect from '../MultipleSelect'

const useStyle = makeStyles({
  inputRoot: {
    fontSize: 12,
  },
  labelRoot: {
    fontSize: 12,
    '&$labelFocused': {},
  },
  labelFocused: {},
  buttonPadding: {
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: '30px',
  },
  errorLabel: {
    color: 'red',
  },
})

const VoucherForm = () => {
  const classes = useStyle()
  const { doctors, findDoctor } = useDoctorService()
  const { patients, findPatient } = usePatientService()
  const { hospitals, findHospital } = useHospitalService()
  const { specializations, findSpecialization } = useSpecializationService()
  const {
    error,
    params,
    voucherId,
    handleSave,
    amountFlags,
    handleParams,
    voucherFlags,
    doctorSelected,
    typeOfServices,
    handleDateInput,
    patientSelected,
    hospitalSelected,
    setDoctorSelected,
    setPatientSelected,
    setHospitalSelected,
    specializationSelected,
    setSpecializationSelected,
  } = useVoucherForm()

  return (
    <Box marginBottom={5}>
      <Box p={3}>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ boxShadow: '0 4px 2px -2px #C7C7D2', paddingBottom: '15px' }}
        >
          <Link color="inherit" href="/payment/data-voucher/list">
            Manajemen Data Voucher
          </Link>
          <Link color="inherit" href="#">
            Voucher Baru
          </Link>
        </Breadcrumbs>
      </Box>
      <Box px={3}>
        <Grid item container xs={9}>
          <Grid item container xs={6} alignItems="center">
            <Link href="/payment/data-voucher/list">{'< Kembali'}</Link>
            <Typography style={{ marginLeft: '25px', fontWeight: 'bold' }}>
              Form Voucher Baru
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              className={classes.buttonPadding}
              mr={10}
              onClick={() => handleSave()}
              variant="contained"
              color="primary"
              style={{ textTransform: 'none' }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Box px={3} py={2}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <FormControl fullWidth>
                  <InputLabel
                    shrink
                    className={classes.labelRoot}
                    id="voucher_flag"
                  >
                    Voucher Flag *
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="voucher_flag"
                    disabled={voucherId}
                    value={params?.voucherFlag || ''}
                    onChange={(event) => handleParams(event, 'voucherFlag')}
                    displayEmpty
                  >
                    {voucherFlags.map((item, index) => (
                      <MenuItem key={index.toString()} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {error.voucherFlag !== '' && (
                  <FormHelperText className={classes.errorLabel}>
                    {error.voucherFlag}
                  </FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <MultipleSelect
                  label="Specialist Category ID (Opsional)"
                  value={specializationSelected}
                  options={specializations}
                  disabled={voucherId && params.haveTransaction}
                  inputHandler={(event) =>
                    findSpecialization(event.target.value)
                  }
                  selectHandler={(item) => setSpecializationSelected(item)}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <FormControl fullWidth>
                  <InputLabel
                    shrink
                    className={classes.labelRoot}
                    id="type_of_service"
                  >
                    Type of service *
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="type_of_service"
                    value={params?.typeOfService || ''}
                    onChange={(event) => handleParams(event, 'typeOfService')}
                    displayEmpty
                  >
                    {typeOfServices.map((item, index) => (
                      <MenuItem key={index.toString()} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box px={3} py={2}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <TextField
                  fullWidth
                  label="Voucher Code *"
                  value={
                    params?.voucherFlag === 'MULTIPLE'
                      ? ''
                      : params?.voucherCode || ''
                  }
                  disabled={params?.voucherFlag === 'MULTIPLE' || voucherId}
                  onChange={(event) => handleParams(event, 'voucherCode')}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <MultipleSelect
                  label="Doctor ID (Opsional)"
                  value={doctorSelected}
                  disabled={voucherId && params.haveTransaction}
                  options={doctors}
                  inputHandler={(event) => findDoctor(event.target.value)}
                  selectHandler={(item) => setDoctorSelected(item)}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Use per Customer *"
                  value={params?.usePerCustomer || ''}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(event) => handleParams(event, 'usePerCustomer')}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box px={3} py={2}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <FormControl fullWidth>
                  <InputLabel
                    className={classes.labelRoot}
                    id="promo_combination"
                    shrink
                  >
                    Promo Combination *
                  </InputLabel>
                  <Select
                    fullWidth
                    displayEmpty
                    labelId="promo_combination"
                    disabled={voucherId && params.haveTransaction}
                    value={params?.promoCombination || ''}
                    onChange={(event) =>
                      handleParams(event, 'promoCombination')
                    }
                  >
                    <MenuItem value="">
                      Silahkan Pilih Promo Combination
                    </MenuItem>
                    <MenuItem value="1">True</MenuItem>
                    <MenuItem value="0">False</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <MultipleSelect
                  label="Patient ID (Opsional)"
                  value={patientSelected}
                  options={patients}
                  disabled={voucherId && params.haveTransaction}
                  inputHandler={(event) => findPatient(event.target.value)}
                  selectHandler={(item) => setPatientSelected(item)}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Use per Discount *"
                  value={params?.usePerDiscount || ''}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(event) => handleParams(event, 'usePerDiscount')}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box px={3} py={2}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimum Transaction *"
                  disabled={voucherId && params.haveTransaction}
                  value={params?.minimumTransaction || ''}
                  onChange={(event) =>
                    handleParams(event, 'minimumTransaction')
                  }
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box paddingRight={4}>
                <MultipleSelect
                  label="Hospital ID (Opsional)"
                  value={hospitalSelected}
                  options={hospitals}
                  disabled={voucherId && params.haveTransaction}
                  inputHandler={(event) => findHospital(event.target.value)}
                  selectHandler={(item) => setHospitalSelected(item)}
                />
              </Box>
            </Grid>
            {params?.voucherFlag === 'MULTIPLE' && (
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Total Generate *"
                    disabled={voucherId}
                    value={params?.voucherGenerate || ''}
                    onChange={(event) => handleParams(event, 'voucherGenerate')}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused,
                      },
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Box mt={8}>
          <Box px={3} py={2}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      shrink
                      className={classes.labelRoot}
                      id="amount_flag"
                    >
                      Amount Flag *
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="amount_flag"
                      disabled={voucherId && params.haveTransaction}
                      value={params?.amountFlag || ''}
                      onChange={(event) => handleParams(event, 'amountFlag')}
                      displayEmpty
                    >
                      {amountFlags.map((item, index) => (
                        <MenuItem key={index.toString()} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Amount Covered by Marketikng *"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={params?.amountCoveredByMarketing || ''}
                    disabled={voucherId && params.haveTransaction}
                    onChange={(event) =>
                      handleParams(event, 'amountCoveredByMarketing')
                    }
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused,
                      },
                    }}
                  />
                  {error.amountCoveredByMarketing !== '' && (
                    <FormHelperText className={classes.errorLabel}>
                      {error.amountCoveredByMarketing}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box px={3} py={2}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <TextField
                    fullWidth
                    label="Voucher Amount *"
                    type="number"
                    value={params?.voucherAmount || ''}
                    disabled={voucherId && params.haveTransaction}
                    onChange={(event) => handleParams(event, 'voucherAmount')}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: params?.amountFlag === 'PERCENTAGE' ? 100 : '',
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused,
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <TextField
                    fullWidth
                    label="Amount Covered by Doctor *"
                    type="number"
                    disabled={voucherId && params.haveTransaction}
                    value={params?.amountCoveredByDoctor || ''}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(event) =>
                      handleParams(event, 'amountCoveredByDoctor')
                    }
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused,
                      },
                    }}
                  />
                  {error.amountCoveredByDoctor !== '' && (
                    <FormHelperText className={classes.errorLabel}>
                      {error.amountCoveredByDoctor}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box px={3} py={2}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Max. Amount (optional)"
                    value={params?.maximumAmount || ''}
                    onChange={(event) => handleParams(event, 'maximumAmount')}
                    InputProps={{ inputProps: { min: 0 } }}
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused,
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Amount Covered by Hospital *"
                    disabled={voucherId && params.haveTransaction}
                    value={params?.amountCoveredByHospital || ''}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(event) =>
                      handleParams(event, 'amountCoveredByHospital')
                    }
                    InputLabelProps={{
                      classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused,
                      },
                    }}
                  />
                  {error.amountCoveredByHospital !== '' && (
                    <FormHelperText className={classes.errorLabel}>
                      {error.amountCoveredByHospital}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box px={3} py={2}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                      fullWidth
                      label="Begin Effective"
                      disablePast={!voucherId}
                      format="YYYY-MM-DD HH:mm"
                      minDate={
                        !voucherId ? new Date() : params?.beginEffectiveDate
                      }
                      value={params?.beginEffectiveDate}
                      onChange={(event) =>
                        handleDateInput(event, 'beginEffectiveDate')
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box paddingRight={4}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                      fullWidth
                      label="End Effective"
                      value={params?.endEffectiveDate}
                      format="YYYY-MM-DD HH:mm"
                      disabled={!params?.beginEffectiveDate}
                      minDate={params?.beginEffectiveDate}
                      onChange={(event) =>
                        handleDateInput(event, 'endEffectiveDate')
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default VoucherForm
